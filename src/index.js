import _ from 'lodash';

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    const h2=document.createElement("h2")
    h2.innerHTML="NASLOV";
    element.appendChild(h2);
    return element;
  }
  
  document.body.appendChild(component());

  // npm install babel-cli babel-preset-env --save-dev
  //npm install babel-loader babel-core --save-dev
  