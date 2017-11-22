import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';


class BusinessList extends React.Component {
render(){
  //added this on Sat NOv 18 console.log
//  console.log(this.props)
  return(
  <div className="BusinessList">
  {this.props.businesses.map(business => {
    return <Business business={business} key={business.id}/>
  })
}
</div>
);
}
};

export default BusinessList;
