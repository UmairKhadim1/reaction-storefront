export default `
query getUserByuserName($userName: String!) {
  getUserByuserName(userName: $userName) {
    name
    profilePhoto
    canFollow
    userName
    follower {
       name
          profile {
            name 
            picture
          }
         username
       }
       following {
        name
           profile {
             name 
             picture
           }
          username
        }
    }
  }
`;
