import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoExtract from '../src/jsPages/fileExtract/infoExtract';        //待测试文件的路径；


Enzyme.configure({adapter: new Adapter()});


describe('shallow test', function () {
  // 测试信息提取并显示
  it('setShowText test', function(){
    let infoExtract = shallow(<InfoExtract/>);
    let text = "Name:Mike\nAge:25\nTel:15212341234\nEmail:123456789@qq.com\nCity:Nanjing\nIntention:Shanghai";
    let dic = {Name:'Mike',Age:'25',Tel:'15212341234',Email:'123456789@qq.com',City:'Nanjing',Intention:'Shanghai'}
    infoExtract.instance().setShowText(text);
    expect(infoExtract.instance().state.showText).toEqual(text);
    expect(infoExtract.instance().state.inputValues).toEqual(dic);
  });

})

