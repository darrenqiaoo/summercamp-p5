import os
from flask import Flask, request, send_from_directory
from flask_cors import CORS
import base64
from aip import AipOcr
import pymysql
import http.client
import hashlib
import urllib
import random
import json
import time

app = Flask(__name__)
CORS(app)


def executeSQL(sql):
    # 数据库操作
    db = pymysql.connect("localhost", "root", "12345678", "file_upload")
    cursor = db.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    db.commit()
    cursor.close()
    db.close()
    return result


# 文字识别账号信息
APP_ID = "21657992"
API_KEY = "py5kA6qhko9MVKdwVIP3PIgn"
SECRET_KEY = "aLrz1sEFV1EzA4EqYh7mS3LeueL4DZiZ"
client = AipOcr(APP_ID, API_KEY, SECRET_KEY)


def generalOCR(img):
    # 通用文字识别
    # 接受参数为图片的base64编码的字符串，需要转换成base64编码
    # 返回识别内容的字符串，一行为一个键值对，格式为如下：
    #        key1:value1
    #        key2:value2
    #        key3:value3
    # 下面是百度通用文字识别的调用方法
    options = {"language_type": "CHN_ENG", "detect_direction": "true", "detect_language": "true", "probability": "true"}
    picture_result = client.basicAccurate(img, options)
    result = []
    for line in picture_result["words_result"]:
        result.append(line["words"].strip())
    return "\n".join(result)


def receiptOCR(img):
    # 发票识别
    options = {"language_type": "CHN_ENG", "detect_direction": "true", "detect_language": "true", "probability": "true"}
    picture_result = client.basicAccurate(img, options)
    result = ""
    flag = 0  # 0代表购方 1代表销售方
    t = ""
    nextlineispname = 0
    for line in picture_result["words_result"]:
        currline = line["words"].strip()
        element = "名"
        if currline.endswith(element):
            t += currline
        else:
            t += currline + "\n"
        if nextlineispname == 1:
            result += "商品名称:" + currline + "\n"
            nextlineispname = 2
            continue
        if "专用发票" in currline:
            result += "发票种类:专用发票" + "\n"
            continue
        elif "普通发票" in currline:
            result += "发票种类:普通发票" + "\n"
            continue
        if "发票代码" in currline:
            result += currline + "\n"
            continue
        if "发票号码" in currline:
            result += currline + "\n"
            continue
        if "开票日期" in currline:
            result += currline + "\n"
            continue
        if "税额" in currline:
            nextlineispname = 1
            continue
        if "小写" in currline:
            temp = currline
            temp = temp.split("￥")[-1]
            result += "价税合计:" + temp + "\n"
            continue
        if "称" in currline:
            temp = currline
            temp = temp.split("称:")[-1]
            if flag == 0:
                result += "购方名称:" + temp + "\n"
            else:
                result += "销售方名称:" + temp + "\n"
            continue
        if "纳税人识别号" in currline:
            temp = currline
            temp = temp.split("纳税人识别号:")[-1]
            if flag == 0:
                result += "购方纳税人识别号:" + temp + "\n"
            else:
                result += "销售方纳税人识别号:" + temp + "\n"
            continue
    return result.strip("\n")


def translate(q=""):
    appid = '20200821000548196'  # 填写你的appid
    secretKey = 'SnJecrse3KX6g0FXWYvB'  # 填写你的密钥
    httpClient = None
    myurl = '/api/trans/vip/translate'
    fromLang = 'auto'  # 原文语种
    salt = random.randint(32768, 65536)
    sign = appid + q + str(salt) + secretKey
    sign = hashlib.md5(sign.encode()).hexdigest()
    toLang = "en"
    myurl = myurl + '?appid=' + appid + '&q=' + urllib.parse.quote(
        q) + '&from=' + fromLang + '&to=' + toLang + '&salt=' + str(
        salt) + '&sign=' + sign
    try:
        httpClient = http.client.HTTPConnection('api.fanyi.baidu.com')
        httpClient.request('GET', myurl)
        # response是HTTPResponse对象
        response = httpClient.getresponse()
        result_all = response.read().decode("utf-8")
        result = json.loads(result_all)
        return result
    except Exception as e:
        return str(e.args)
    finally:
        if httpClient:
            httpClient.close()


@app.route("/", methods=["POST", "GET"])
def root():
    return "hello"


@app.route("/upload", methods=["POST"])
def upload():
    # 文件上传
    data = eval(request.data.decode())["params"]
    userName = data["userName"]
    fType = data["type"]
    fName = data["name"]
    fContent = data["content"]
    path = "./files/" + fName
    if fType == "text":
        with open(path, "w") as f:
            f.write(fContent)
    else:
        with open(path, "wb") as f:
            f.write(base64.b64decode(fContent.split(",")[1]))
    if userName:
        sql = 'insert into files values(0,"%s","%s","%s","%s")' % (fName, path, userName, fType)
        executeSQL(sql)
    return ""


@app.route("/login", methods=["GET"])
def login():
    # 登录
    user = request.args
    userName = user.get("userName")
    password = user.get("password")
    sql = 'select password from users where user_name="%s"' % userName
    result = executeSQL(sql)
    if password == result[0][0]:
        return "1"
    return "0"


@app.route("/getFiles", methods=["GET"])
def getFiles():
    # 获取用户名对应的文件列表
    user = request.args
    userName = user.get("userName")
    sql = 'select file_name from files where owner="%s"' % userName
    result = executeSQL(sql)
    files = [r[0] for r in result]
    return ",".join(files)


@app.route("/delete", methods=["POST"])
def delete():
    # 删除文件
    data = eval(request.data.decode())["params"]
    userName = data["userName"]
    fileName = data["fileName"]
    sql = 'delete from files where file_name="%s" and owner="%s"' % (fileName, userName)
    executeSQL(sql)
    return ""


@app.route('/files/<fileName>/', methods=["GET"])
def preview(fileName):
    # 预览文件
    UPLOAD_PATH = os.path.join(os.path.dirname(__file__), 'files')
    return send_from_directory(UPLOAD_PATH, fileName)


@app.route("/ocr", methods=["GET"])
def getOcrResult():
    fileName = request.args.get("fileName").replace('"', "")
    ocrType = request.args.get("ocrType").replace('"', "")
    try:
        with open("./files/" + fileName, "rb") as f:
            img = f.read()
        if ocrType == "receipt":
            ocrResult = receiptOCR(img)
            return translate(ocrResult)
        else:
            ocrResult = generalOCR(img)
            return translate(ocrResult)
    except FileNotFoundError:
        return "file not exist"


@app.route("/translate", methods=["GET"])
def getTranslateResult():
    file = request.args.get("file")
    if file:
        file = file.replace('"', "")
        file_type = file.split(".")[1]
        try:
            if file_type in ["txt", "md"]:
                with open("./files/"+file, "r") as f:
                    return translate(f.read())
            elif file_type in ["png", "jpeg"]:
                with open("./files/"+file, "rb") as f:
                    return translate(generalOCR(f.read()))
            else:
                return "not supported file"
        except FileNotFoundError:
            return "file not exist"
    else:
        origin = request.args.get("origin")
        return translate(origin)


@app.route("/markdown", methods=["GET", "POST"])
def markdown():
    if request.method == "GET":
        file = request.args.get("file")
        file = file.replace('"', "")
        file_type = file.split(".")[1]
        try:
            if file_type in ["txt", "md"]:
                with open("./files/" + file, "r") as f:
                    return f.read()
            else:
                return "not supported file"
        except FileNotFoundError:
            return "file not exist"
    else:
        file = eval(request.data.decode())["params"]["file"].replace("\"", "")
        data = eval(request.data.decode())["params"]["data"]
        with open("./files/"+file, "w") as f:
            f.write(data)
        return ""


if __name__ == "__main__":
    app.run("0.0.0.0", port=3389)
