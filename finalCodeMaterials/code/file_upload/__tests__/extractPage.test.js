import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExtractPage from '../src/jsPages/fileExtract/extractPage';        //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});

//整体测试；
describe('ExtractPage test', function () {
    it('Test for all functions', function(){
        const props = {
            formRef:React.createRef()
          };

        let wrapper = shallow(<ExtractPage {...props} />);
        expect(wrapper.find("Button").at(0).text()).toEqual("Submit");
        expect(wrapper.find("Button").at(1).text()).toEqual("Reset");  

        wrapper.instance().openApp();
        expect(wrapper.instance().state.visible).toEqual(true);

        wrapper.instance().showFileContent("text/test.txt");

        wrapper.find('Button').at(0).simulate('click');
        wrapper.find('Button').at(1).simulate('click');
  });

  it('Test for handleSubmit', function(){
    const props = {
        setVisibility:jest.fn(),
        fileContent:"Hello cirix!"
      };

    let wrapper = shallow(<ExtractPage {...props} />);
    
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.instance().state.visible).toEqual(false);

    wrapper.find('AppList').simulate('setSelectedApp');
    expect(wrapper.instance().state.visible).toEqual(false);
  });
});
