from flask import Flask, request
from flask_cors import CORS
import base64
from aip import AipOcr
import pymysql

app = Flask(__name__)
CORS(app)


def generalOCR(data):
    # 通用文字识别
    # 接受参数为图片的base64编码的字符串，需要转换成base64编码
    # 返回识别内容的字符串，一行为一个键值对，格式为如下：
    #        key1:value1
    #        key2:value2
    #        key3:value3

    # 下面是百度通用文字识别的调用方法
    APP_ID = "21657992"
    API_KEY = "py5kA6qhko9MVKdwVIP3PIgn"
    SECRET_KEY = "aLrz1sEFV1EzA4EqYh7mS3LeueL4DZiZ"
    client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    options = {"language_type": "CHN_ENG", "detect_direction": "true", "detect_language": "true", "probability": "true"}
    imgB64 = base64.b64decode(data)  # 字符串转换为base64编码
    picture_result = client.basicAccurate(imgB64, options)
    result = ""
    for line in picture_result["words_result"]:
        result += line["words"].strip() + "\n"
    return result.strip("\n")


@app.route('/', methods=["POST", "GET"])
def root():
    return "hello"


@app.route("/login", methods=["GET"])
def login():
    # 登录
    user = request.args
    userName = user.get("userName")
    password = user.get("password")
    db = pymysql.connect("localhost", "root", "12345678", "file_upload")
    cursor = db.cursor()
    sql = "select password from users where user_name=%s"
    cursor.execute(sql, userName)
    result = cursor.fetchall()
    db.commit()
    cursor.close()
    db.close()
    if password == result[0][0]:
        return "1"
    return "0"


@app.route('/ocr', methods=["GET"])
def getImgResult():
    # ocr识别
    data = request.args.get("img").split(",")[1]
    return generalOCR(data)


if __name__ == '__main__':
    app.run()
