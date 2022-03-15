import React from 'react';
import {Link} from 'react-router-dom';
import FeedNav from './FeedNav';

export default class Articles extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    console.log(this.props.articles);
      return (
        <section className="articles-container">
          <div className="container flex">
            <FeedNav user={this.props.user} activeFeed={this.props.activeFeed} clearTagAndFeed={this.props.clearTagAndFeed} clearTag={this.props.clearTag} selectedTag={this.props.selectedTag} />
            {
              this.props.articles.length === 0 ? 'No articles in your feed yet...' :
              this.props.articles?.map(article => (
                <article key={article.slug} className="article-card flex">
                  <div className="user-info flex">
                    <img src={article.author.image ? article.author.image : 'logo512.png'} className='user-icon' />
                    <div className='article-creation-info'>
                      <h6>
                        <Link to={`/profiles/${article.author.username}`} className='text-sm text-primary site-link'>
                          {article.author.username}
                        </Link>
                      </h6>
                      <time className='text-xsm text-secondary'>{
                        this.props.getDate(article.createdAt)
                      }
                      </time>
                      <button className='favourite-count'>💚 {article.favoritesCount}</button>
                    </div>
                  </div>
                  <div className="article-info">
                    <Link to={`/articles/${article.slug}`} className='site-link'>
                      <h3 className='text-md text-bold text-primary'>{article.title}</h3>
                    </Link>
                    <p className='text-sm text-secondary'>{article.description}</p>
                  </div>
                  <div className="read-info flex">
                    <Link to={`/articles/${article.slug}`} style={{textDecoration: 'none'}}>
                      <p className='text-xsm text-secondary read-link'>Read More...</p>
                    </Link>
                    <ul className='article-card-tag-list flex'>
                      {
                        article.tagList?.map(tag => (
                          <li key={tag} className='text-xsm text-secondary tag-item'>{tag}</li>
                        ))
                      }
                    </ul>
                  </div>
                </article>
              ))
            }
          </div>
        </section>
      )
  }  
}


/*

<article className="article-card flex">
  <div className="user-info flex">
    <img src='logo192.png' className='user-icon' />
    <div className='article-creation-info'>
      <h6 className='text-sm text-primary'>Gerome</h6>
      <time className='text-xsm text-secondary'>Wed Nov 24 2021</time>
    </div>
  </div>
  <div className="article-info">
    <h3 className='text-md text-bold text-primary'>Create a new Implementation</h3>
    <p className='text-sm text-secondary'>lorem ipsum dolor sit amet consectetur dolor amet.</p>
  </div>
  <div className="read-info flex">
    <a className='text-xsm text-secondary read-link'>Read More...</a>
    <ul className='article-card-tag-list flex'>
      <li className='text-xsm text-secondary tag-item'>tag</li>
      <li className='text-xsm text-secondary tag-item'>tag</li>
    </ul>
  </div>
</article>
<article className="article-card flex">
  <div className="user-info flex">
    <img src='logo192.png' className='user-icon' />
    <div className='article-creation-info'>
      <h6 className='text-sm text-primary'>Gerome</h6>
      <time className='text-xsm text-secondary'>Wed Nov 24 2021</time>
    </div>
  </div>
  <div className="article-info">
    <h3 className='text-md text-bold text-primary'>Create a new Implementation</h3>
    <p className='text-sm text-secondary'>lorem ipsum dolor sit amet consectetur dolor amet.</p>
  </div>
  <div className="read-info flex">
    <a className='text-xsm text-secondary read-link'>Read More...</a>
    <ul className='article-card-tag-list flex'>
      <li className='text-xsm text-secondary tag-item'>tag</li>
      <li className='text-xsm text-secondary tag-item'>tag</li>
    </ul>
  </div>
</article>
<article className="article-card flex">
  <div className="user-info flex">
    <img src='logo192.png' className='user-icon' />
    <div className='article-creation-info'>
      <h6 className='text-sm text-primary'>Gerome</h6>
      <time className='text-xsm text-secondary'>Wed Nov 24 2021</time>
    </div>
  </div>
  <div className="article-info">
    <h3 className='text-md text-bold text-primary'>Create a new Implementation</h3>
    <p className='text-sm text-secondary'>lorem ipsum dolor sit amet consectetur dolor amet.</p>
  </div>
  <div className="read-info flex">
    <a className='text-xsm text-secondary read-link'>Read More...</a>
    <ul className='article-card-tag-list flex'>
      <li className='text-xsm text-secondary tag-item'>tag</li>
      <li className='text-xsm text-secondary tag-item'>tag</li>
    </ul>
  </div>
</article><article className="article-card flex">
  <div className="user-info flex">
    <img src='logo192.png' className='user-icon' />
    <div className='article-creation-info'>
      <h6 className='text-sm text-primary'>Gerome</h6>
      <time className='text-xsm text-secondary'>Wed Nov 24 2021</time>
    </div>
  </div>
  <div className="article-info">
    <h3 className='text-md text-bold text-primary'>Create a new Implementation</h3>
    <p className='text-sm text-secondary'>lorem ipsum dolor sit amet consectetur dolor amet.</p>
  </div>
  <div className="read-info flex">
    <a className='text-xsm text-secondary read-link'>Read More...</a>
    <ul className='article-card-tag-list flex'>
      <li className='text-xsm text-secondary tag-item'>tag</li>
      <li className='text-xsm text-secondary tag-item'>tag</li>
    </ul>
  </div>
</article>
<article className="article-card flex">
  <div className="user-info flex">
    <img src='logo192.png' className='user-icon' />
    <div className='article-creation-info'>
      <h6 className='text-sm text-primary'>Gerome</h6>
      <time className='text-xsm text-secondary'>Wed Nov 24 2021</time>
    </div>
  </div>
  <div className="article-info">
    <h3 className='text-md text-bold text-primary'>Create a new Implementation</h3>
    <p className='text-sm text-secondary'>lorem ipsum dolor sit amet consectetur dolor amet.</p>
  </div>
  <div className="read-info flex">
    <a className='text-xsm text-secondary read-link'>Read More...</a>
    <ul className='article-card-tag-list flex'>
      <li className='text-xsm text-secondary tag-item'>tag</li>
      <li className='text-xsm text-secondary tag-item'>tag</li>
    </ul>
  </div>
</article>

*/