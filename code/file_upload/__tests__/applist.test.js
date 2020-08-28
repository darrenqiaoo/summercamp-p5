import React, { Component } from 'react';
import Enzyme, {shallow,render,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppList from '../src/commonComponents/appList';        //待测试文件的路径；

Enzyme.configure({adapter: new Adapter()});

//整体测试；
describe('AppList test', function () {
    it('Test for handleCancel', function(){
        const props = {
            setSelectedApp:jest.fn()
          };
        let wrapper = shallow(<AppList {...props} />);
        
        wrapper.find('Modal').simulate('cancel');
        expect(props.setSelectedApp).toHaveBeenCalled();

        wrapper.find('li').at(0).simulate('click');
        expect(props.setSelectedApp).toHaveBeenCalled();

        wrapper.find('li').at(1).simulate('click');
        expect(props.setSelectedApp).toHaveBeenCalled();

        wrapper.find('li').at(2).simulate('click');
        expect(props.setSelectedApp).toHaveBeenCalled();

        wrapper.find('li').at(3).simulate('click');
        expect(props.setSelectedApp).toHaveBeenCalled();
    });
});
