import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UploadPage from '../src/jsPages/fileUpload/uploadPage';  //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});

//整体测试；
describe('UploadPage test', function () {
  it('Test for all functions', function(){
    let uploadpage = shallow(<UploadPage/>);
    let cur=uploadpage.find('FileDropBox');
    expect(cur.length).toEqual(1);
  });
});
