# ShopBackend


# DB Fields
Users:
firstName: "string",
lastName: "string",
email: "string",
accountType: enum
dateCreated: date
dateUpdated: date
cartId: int

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
