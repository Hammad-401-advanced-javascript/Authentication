// from GH docs Request a user's GitHub identity
const URL = 'https://github.com/login/oauth/authorize';

// need query string
const options={
  client_id:'55dc4a6462736d3ca10d',
  redirect:'http://localhost:4000/oauth',
  scope:'read:user',
  state:'Lab class-12',
};
// conserting the obj to string and formatting theresulting string
const queryString=Object.keys(options)
  .map((key)=>{
    return `${key}=${encodeURIComponent(options[key])}`;

  })
  .join('&');

console.log('Query', queryString);
// making the full url

const authUrl=`${URL}?${queryString}`;
const link = document.getElementById('oauth');
link.setAttribute('href',authUrl);

