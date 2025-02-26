USE [Ecommerce-db]
GO

IF OBJECT_ID('dbo.ProductCategories', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductCategories]

CREATE TABLE [dbo].[ProductCategories] (
    [CategoryId] INT IDENTITY(1,1) PRIMARY KEY,
    [Category] NVARCHAR(50),
    [SubCategory] NVARCHAR(50)
)

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Fruits', N'Orange')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Vegetables', N'Potato')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Vegetables', N'Tomato')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Fruits', N'Apple')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Snacks', N'Cookies')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Snacks', N'Chips')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Snacks', N'Chocolates')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Fruits', N'Mango')

INSERT INTO [dbo].[ProductCategories] ([Category], [SubCategory])
VALUES (N'Fruits', N'Grapes')

IF OBJECT_ID('dbo.Offers', 'U') IS NOT NULL
    DROP TABLE [dbo].[Offers]

CREATE TABLE [dbo].[Offers] (
    [OfferId] INT IDENTITY(1,1) PRIMARY KEY,
    [Title] NVARCHAR(50),
    [Discount] INT
)

INSERT INTO [dbo].[Offers] ([Title], [Discount])
VALUES (N'diwali dhamaka', 25)

INSERT INTO [dbo].[Offers] ([Title], [Discount])
VALUES (N'christmas sale', 15)

INSERT INTO [dbo].[Offers] ([Title], [Discount])
VALUES (N'august special', 5)

INSERT INTO [dbo].[Offers] ([Title], [Discount])
VALUES (N'crazy shopping sale', 40)

INSERT INTO [dbo].[Offers] ([Title], [Discount])
VALUES (N'holi sale', 10)

IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL
    DROP TABLE [dbo].[Products]

CREATE TABLE [dbo].[Products] (
    [ProductId] INT IDENTITY(1,1) PRIMARY KEY,
    [Title] NVARCHAR(50),
    [CategoryId] INT,
    [OfferId] INT,
    [Price] INT,
    [Quantity] INT,
    [ImageName] NVARCHAR(50)
)

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 1', 1, 1, 30, 560, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 2', 3, 2, 65, 120, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 3', 2, 3, 130, 766, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 4', 1, 4, 93, 200, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 5', 1, 5, 30, 2340, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 6', 5, 6, 24, 245, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 7', 3, 7, 70, 1000, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 8', 4, 8, 120, 344, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 9', 5, 9, 180, 1200, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 10', 2, 10, 136, 250, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 11', 1, 11, 110, 200, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 12', 5, 12, 170, 178, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 13', 2, 13, 120, 350, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 14', 2, 14, 40, 120, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 15', 4, 15, 179, 400, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 16', 5, 16, 150, 344, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 17', 3, 17, 60, 400, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 18', 1, 18, 90, 500, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 19', 1, 19, 130, 200, N'')

INSERT INTO [dbo].[Products] ([Title], [CategoryId], [OfferId], [Price], [Quantity], [ImageName])
VALUES (N'Product 20', 2, 20, 35, 800, N'')

SET IDENTITY_INSERT [dbo].[Products] OFF
GO
/*
SET IDENTITY_INSERT [dbo].[PaymentMethods] ON 

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'Cash', N'', N'True', N'')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'Card Payment', N'Bank', N'True', N'')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'Net Banking', N'SBI', N'True', N'')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'Net Banking', N'ICICI', N'True', N'')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'Net Banking', N'Bank of Maharashtra', N'False', N'server down')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'UPI', N'Google Pay', N'True', N'')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'UPI', N'Phone Pay', N'True', N'')

INSERT INTO [dbo].[PaymentMethods] ([Type], [Provider], [Available], [Reason])
VALUES (N'UPI', N'BHIM Pay', N'True', N'')

SET IDENTITY_INSERT [dbo].[PaymentMethods] OFF
GO
*/