const clientId = 'a40EGc4uU0JIkUXb8HpOgA';
const secret = 'esYhVHsgVNCdsHJ0cGWCaCYfdVCh6SKNiY5TSE1Yq56t7k8oiN90GbsAdAiW6MOl';
const urlCORS = 'https://cors-anywhere.herokuapp.com/';

let accessToken='';

const Yelp = {
  getAccessToken(){
  if (accessToken){
    return new Promise(resolve =>
      resolve(accessToken));
    }
  return fetch(`${urlCORS}https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
     {method: 'POST'}).then(response => {
       return response.json();
     }).then(jsonResponse => {
       accessToken = jsonResponse.access_token}
     )},

     search (term, location, sortBy){
       return Yelp.getAccessToken().then(()=>
       {return fetch(`${urlCORS}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
         {headers: {Authorization: 'Bearer ${accessToken}'}
       })
     }).then(response => {
         return response.json();
       }).then(jsonResponse =>
       {if(jsonResponse.businesses){
         return jsonResponse.businesses.map(business => ({
         id: business.id,
         imageSrc: business.image_url,
         name: business.name,
         address: business.location.address1,
         city: business.location.city,
         state: business.location.state,
         zipCode: business.location.zipCode,
         category: business.categories[0].title,
         rating: business.rating,
         reviewCount: business.review_count
       }));
   }
 })
}
}

export default Yelp;
 
