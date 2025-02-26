USE master
GO

-- Create the database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'Ecommerce-db')
CREATE DATABASE [Ecommerce-db]
GO


USE [Ecommerce-db]
GO

-- Create the [CartItems] table
IF OBJECT_ID('[dbo].[CartItems]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CartItems]
GO

CREATE TABLE [dbo].[CartItems](
    [CartItemId] [int] IDENTITY(1,1) NOT NULL,
    [CartId] [int] NOT NULL,
    [ProductId] [int] NOT NULL,
    CONSTRAINT [PK_CartItems] PRIMARY KEY CLUSTERED 
    (
        [CartItemId] ASC
    )
) ON [PRIMARY]
GO

-- Create the [Carts] table
IF OBJECT_ID('[dbo].[Carts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Carts]
GO

CREATE TABLE [dbo].[Carts](
    [CartId] [int] IDENTITY(1,1) NOT NULL,
    [UserId] [int] NOT NULL,
    [Ordered] [nvarchar](10) NOT NULL,
    [OrderedOn] [nvarchar](max) NOT NULL,
    CONSTRAINT [PK_Carts] PRIMARY KEY CLUSTERED 
    (
        [CartId] ASC
    )
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Create the [Offers] table
IF OBJECT_ID('[dbo].[Offers]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Offers]
GO

CREATE TABLE [dbo].[Offers](
    [OfferId] [int] IDENTITY(1,1) NOT NULL,
    [Title] [nvarchar](max) NOT NULL,
    [Discount] [int] NOT NULL,
    CONSTRAINT [PK_Offers] PRIMARY KEY CLUSTERED 
    (
        [OfferId] ASC
    )
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Create the [Orders] table
IF OBJECT_ID('[dbo].[Orders]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Orders]
GO

CREATE TABLE [dbo].[Orders](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [UserId] [int] NOT NULL,
    [CartId] [int] NOT NULL,
    [PaymentId] [int] NOT NULL,
    [CreatedAt] [nvarchar](max) NOT NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
    (
        [Id] ASC
    )
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Create the [PaymentMethods] table
IF OBJECT_ID('[dbo].[PaymentMethods]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PaymentMethods]
GO

CREATE TABLE [dbo].[PaymentMethods](
    [PaymentId] [int] IDENTITY(1,1) NOT NULL,
    [PaymentMethod] [nvarchar](max) NOT NULL,
    CONSTRAINT [PK_PaymentMethods] PRIMARY KEY CLUSTERED 
    (
        [PaymentId] ASC
    )
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
