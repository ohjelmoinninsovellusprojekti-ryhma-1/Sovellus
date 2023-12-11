import React from 'react';

export const TopBar = () => {
    return (
         <div id = "topbarBackground">
            <h1> MOVIEHUB </h1>
            <div class = "topbarButtons">
               <button class = "Movies"><h3>MOVIES</h3></button>
               <button  class = "Series"> <h3>SERIES</h3></button>
               <button  class = "contactUs"><h3>CONTACT US</h3></button>
               <button  class = "groups"><h3>GROUPS</h3></button>
               <button  class = "account"><h3>ACCOUNT</h3></button>
               <button  class = "login"><h3>LOGIN</h3></button>
              </div> 
              <div class = "bottomline">
              </div>
         </div>
    )
}

export default TopBar;
