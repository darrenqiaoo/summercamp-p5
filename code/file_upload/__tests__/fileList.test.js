import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileList from '../src/commonComponents/fileList';        //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});

//整体测试；
describe('FileList test', function () {
  
    it('Test for itemClick', function(){
        const props = {
          files:["test.txt"],
          showFileContent: jest.fn()
        }
        let wrapper = shallow(<FileList {...props} />);
        wrapper.find('span').at(0).simulate('click');
        expect(props.showFileContent).toHaveBeenCalledWith("test.txt");
    });

    it('Test for handleDelete', function(){
      const props = {
        files:["test1.txt","test2.txt"],
        setFiles: jest.fn()
      }
      let wrapper = shallow(<FileList {...props} />);
      wrapper.find('span').at(3).simulate('click');
      expect(props.setFiles).toHaveBeenCalledWith(["test2.txt"]);
  });
});
