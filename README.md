# ShopBackend


# DB Fields
User-
{
    "_id": "67f1acb20492880bb53d8d88",
    "firstName": "Bob",
    "lastName": "Joe",
    "email": "bob@joe.com",
    "favoriteColor": "Blue",
    "accountType": "Client",
    "dateCreated": "4/5/2025",
    "dateUpdated": "4/5/2025",
    "cartId": "3"
  },

Cart:
products []
userId: int
cartTotal: float

Products:
productId: int
productPrice: float
productName: "string"

Orders:
cartId: int
userId: int
dateCreated: date
