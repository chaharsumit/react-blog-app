export default function ArticleBody(props){
  let article = props.article.article.article;
  return (
    <section className="article-body align-left">
      <div className="container flex">
        <p className="text-tertiary text-md">{article.body}</p>
        <ul className='article-card-tag-list flex'>
          {
            article.tagList?.map(tag => <li key={tag} className='text-xsm text-secondary tag-item'>{tag}</li>)
          }
        </ul>
      </div>
    </section>
  )
}