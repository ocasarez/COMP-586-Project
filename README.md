# COMP-586-Project
# Swagger UI for Backend APIs
https://instablogs20191208111010.azurewebsites.net/swagger/index.html 
# Frontend
Angular Application (Hosted with Azure App Services)
# Backend
ASP.NET Core Web API Application (Host with Azure App Services)
# Authentication/Authorization 
Okta https://www.okta.com/
# O/RM
Entity Framework - API calls to the Azure DB
# CI/CD
DevOps - https://dev.azure.com/oscarcasarezruiz0797/Instablogs (Frontend Only) 
# Database
Azure SQL Database

# Other Tools
### Azure KeyVault - To protect DB ConnectionStrings, Okta API Keys, Okta Domain, and Okta Group IDs 
### RestSharp - http://restsharp.org/ 
Used by the backend server, to allow the Angular application to make calls to OKTA API calls.

# OKTA Groups
### Viewers - Can only view blogs (Everyone is a Viewer upon creating an account) 
### Authors - Can create new post blogs 
### Moderators - Can grant/revoke author access and delete blogs. 

# Moderators Only
## To grant access/create a new Author (Moderators only): 
#### Copy/Paste ID from Viewer List, which is not already on Author List. (This will add viewer to author group in OKTA) 
#### Copy/Paste Username, Firstname, and Lastname in the corresponding fields. (This will create a new author in Azure SQL DB) 
#### Click "Grant Access" 

## To revoke/delete an existing Author (Moderators only): 
#### Copy/Paste ID from Author List of author in AuthorId. (This will remove author from Author group in OKTA) 
#### Copy/Paste username of author to revoke access. (This will delete author from Azure SQL Db) 
#### Click "Revoke Access"
