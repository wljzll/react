import React, { Component } from 'react'
import {connect} from 'react-redux'
import BlogItem from './BlogItem'

import {fetchBlogList} from '../../actions/blog'

 class BlogList extends Component {
  
  componentDidMount () {
    this.props.fetchBlogList()
  }
  render() {
    const {list,isloading}=this.props
    return (
      isloading ? 
      <div>isloading</div>
      :
      <ul>
      {
       list.map(item => {
         return  <BlogItem key={item.id} {...item}/>
        })
      }
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  list:state.blog.list,
  isloading:state.blog.isloading
})

export default connect(mapStateToProps,{fetchBlogList})(BlogList)
