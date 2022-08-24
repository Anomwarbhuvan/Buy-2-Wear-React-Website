import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
    
    const { id,imageUrl,title } = category;
    return (
        <div key={id} className="directory-item-container">
        <div className='background-image' style={{backgroundImage:`url(${imageUrl})`}} />

        <div className="directory-item-body">
          <h2>{title}</h2>
          <h2>Buy Now</h2>
        </div>
      </div>

    )
}
export default DirectoryItem;