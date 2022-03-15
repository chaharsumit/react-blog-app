import React from "react";

export default class FeedNav extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ul className='feed-menu flex'>
        {
          this.props.user ? 
            UserFeed(this.props)
          : PublicFeed(this.props)
        }
      </ul>
    )
  }
}

function UserFeed(props){
  return (
    <>
      <li onClick={props.clearTagAndFeed} id='user' className={props.activeFeed === 'user' ? 'feed-status active-feed' : 'feed-status'}>#Your Feed</li>
      <li onClick={props.clearTagAndFeed} id='global' className={props.activeFeed === 'global' ? 'feed-status active-feed' : 'feed-status'}>Global Feed</li>
      {
        props.selectedTag ? <li className='feed-status active-feed'>#{props.selectedTag}</li> : ''
      }
    </>
  ) 
}


function PublicFeed(props){
  return (
    <>
      <li onClick={props.clearTag} className={props.selectedTag ? 'feed-status' : 'feed-status active-feed'}>Global Feed</li>
      {
        props.selectedTag ? <li className='feed-status active-feed'>#{props.selectedTag}</li> : ''
      }
    </>
  ) 
}