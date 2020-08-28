import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';       
import FileDropBox from '../src/commonComponents/uploadDropBox';        //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});


//单元测试；
describe('FileDropBox test', function () {

  it('Test for handleAddFile', function(){
    const props = {
      files:["test1.txt"],
      setFiles:jest.fn(),
    };  
    const mockEvent = {
      currentTarget:{
          files:["test2.txt"]
      },
      target:{
          value:"hello world and offer!"
      }
    };  
    localStorage.setItem('test1.txt', 'hello offer!');
    let wrapper = shallow(<FileDropBox {...props} />);
    expect(wrapper.find('span').at(1).text()).toEqual('Click or drag file to this area to upload');
    wrapper.find('input').simulate('change', mockEvent);
    expect(props.setFiles).toHaveBeenCalledWith(["test1.txt",undefined]);
  });

  it('Test for borderColorLight and borderColorDim', function(){
    let wrapper = shallow(<FileDropBox/>);
    //const dropbox = document.getElementById('fileDropBox')
    wrapper.find('input').simulate('dragenter');
    wrapper.find('input').simulate('dragleave');
    wrapper.find('input').simulate('drop');
    wrapper.find('div').simulate('mouseenter');
    wrapper.find('div').simulate('mouseleave');

    wrapper.instance().openApp();
    expect(wrapper.instance().state.visible).toEqual(false);
  });

});
