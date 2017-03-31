import React from 'react';
import Comment from '../src/comment.jsx';
import {shallow, mount, render} from 'enzyme';
import {expect, assert} from 'chai';
import sinon from 'sinon';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme()); // Note the invocation at the end


const commentActionHandler = sinon.spy();
const commentContextHandler = sinon.spy();
const fontSize = 10;
const zoom = 2;


const comment = {
  "id": "id2PZSCTRPRIJ",
  "xPos": 270,
  "yPos": 232,
  "height": 45,
  "width": 200,
  "content": "this is the content of this comment",
  "style": ""
};

describe('comment renders correctly', () => {

  it('props should have been defined', () => {
    const wrapper = shallow(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    expect(wrapper.comment).to.be.defined;
    expect(wrapper.zoom).to.be.defined;
    expect(wrapper.commentActionHandler).to.be.defined;
    expect(wrapper.onContextMenu).to.be.defined;
    expect(wrapper.fontSize).to.be.defined;
    expect(wrapper.selected).to.be.defined;
  });

  it('should render a `.comment-box`', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    expect(wrapper.find('.comment-box')).to.have.length(1);
  });

  it('should render a `.comment-inner-box`', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    expect(wrapper.find('.comment-inner-box')).to.have.length(1);
  });

  it('should render a `.padding-box`', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    expect(wrapper.find('.padding-box')).to.have.length(1);
  });


  it('should show halo(box with blue border) on mouseEnter of `.comment-box` ', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    //wrapper.setState({ showCircle: true });
    wrapper.find('.comment-box').simulate('mouseEnter');
    //expect(wrapper.state('showCircle')).to.equal(true);
    expect(wrapper.find('.comment-box')).to.have.style('border');

  });

  it('should hide halo(circle with blue border) on mouseLeave of`.comment-box` ', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    //wrapper.setState({ showCircle: false });
    wrapper.find('.comment-box').simulate('mouseLeave');
    //expect(wrapper.state('showCircle')).to.equal(false);
    expect(wrapper.find('.comment-box')).to.not.have.style('border');

  });

  it('should call commentActionHandler when click on `.comment-box`', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    wrapper.find('.comment-box').simulate('click');

    expect(commentActionHandler.calledOnce).to.equal(true);
  });

  it('should call commentContextHandler when right click on `.comment-inner-box`', () => {
    const wrapper = mount(
      <Comment
        comment={comment}
        zoom={zoom}
        fontSize={fontSize}
        commentActionHandler={commentActionHandler}
        onContextMenu={commentContextHandler}
        selected={false}/>
    );

    wrapper.find('.comment-inner-box').simulate('contextMenu');

    expect(commentContextHandler.calledOnce).to.equal(true);
  });

});