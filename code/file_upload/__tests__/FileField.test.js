import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileField from '../src/jsPages/fileUpload/FileField';        //待测试文件的路径；

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

    filefield.find('input').simulate('dragenter');
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFF66"});
    
    filefield.find('input').simulate('dragleave');
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFFCC"});

    filefield.find('input').simulate('drop');
    expect(filefield.instance().state.style).toEqual({backgroundColor: "#FFFFCC"});
  
    filefield.instance().setShowText("test.txt");
    expect(filefield.instance().state.showText).toEqual("test.txt");
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
  
  it('Test for submitBtnClick', function(){
    const props = {
      file_names:["test.txt"]
    };  
    localStorage.setItem('test.txt', 'hello offer!');
    let wrapper = shallow(<FileField {...props} />);
    wrapper.find('button.submit').simulate('click');

  });
})

