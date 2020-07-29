import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileField from '../src/jsPages/fileUpload/FileField';        //待测试文件的路径；
import { fireEvent } from '@testing-library/react';

Enzyme.configure({adapter: new Adapter()});

//判断拖拽框的标题是否正确；
describe('shallow test', function () {
  it('FileField\'s first message should be Drop files to the following box', function(){
    let filefield = shallow(<FileField/>);
    expect(filefield.find('.tips1').text()).toEqual('Drop files to the following box');
  });

  //文件进入showbox以及出来时，看showbox框颜色是否变化；
  it('the color of showbox has been changed', function(){
    let filefield = shallow(<FileField/>);
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFFCC"});
    filefield.instance().dragEnter();
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFF66"});
    filefield.instance().dragLeave();
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFFCC"});
    filefield.instance().dropFile();
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFFCC"});
  });
  
  //测试clear清除按钮；
  it('Clear test', function(){
    let filefield = shallow(<FileField/>);
    let deleteitem=filefield.find('button.clear');
    deleteitem.simulate('click');
    expect(filefield.instance().state.tips).toEqual("no file has been added");
    expect(filefield.instance().state.new_files).toEqual([]);
    expect(filefield.instance().state.file_names).toEqual([]);
    expect(filefield.instance().state.showText).toEqual("");
    expect(localStorage.length).toBe(0);
  });
  
})

