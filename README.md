#Need More Books

The live app can be viewed [Here](https://gregjohle.github.io/need-more-books)

![Image](./images/screenshots/intro.png)

This is an app to allow users the ability to read previews of popular books to see if they would want to read them.

It allows users to do this by providing a populated list of all the books on any one of the New York Times Best Seller lists through the books API. 

The books API uses a query header to select a specific list, and a header for an API key.

The resulting JSON has a lot of deeply nested data. I use some of it to give the user basic information about each book. 

From this list, a user can select a book to preview. The preview is achieved through the Google Books Viewer API. 

The books API requires an ISBN to search for a book. I transition the ISBN obtained from the Books API Json to the viewer API through a hidden object in the results list. 

The viewer API also provides links to find more information on a specific book, as well as a few links to purchase the book.

I do not get any monetary value from someone buying a book through this app. 

