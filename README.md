<h1 align="center">Welcome to google-keep-clone 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> This application is a note taking web app that allows creation, editing and deleting of notes. It is built using html, css, bootstrap and vanilla javascript with the storage of notes using localStorage property. As this project is meant to simplify and work on the frontend side without dealing with backend technologies, localStorage seems to be a viable option to make things work. 

The challenge I faced when building was the positioning of the class color-tooltip element which its positioned is to be relative to the viewport as well as the class toolbar-color element. The solution was to use a an element method called getBoundingClientRect() which returns a DOMRect object that has the coordinates and position of the parent toolbar-color element with respect to the viewport. By taking the coordinates of the toolbar-color element to translate the color-tooltip element works, but it was not relative to the viewport when scrolling is involved. The solution then was to include scrollX/Y property of the window object to the coordinates left and top of the parent element to make the position of color-tooltip element dynamically relative to the viewport. With that, I have yet to make the application mobile responsive which will be implemented sometime soon. 

### ✨ [Demo](https://haphizi.github.io/google-keep-clone/)

## Install

```sh
npm install
```

## Author

👤 **Hafiz**

* Github: [@haphizi](https://github.com/haphizi)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_