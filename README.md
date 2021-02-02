# **Comicfy**

![](https://img.shields.io/github/last-commit/brn1x/comicfy)

## What is **Comicfy**?
*Comicfy* is a desktop platform to organize your Comic Books in a better view then files

## **Releases**
Working on a first release

## **How does it works?**
You can specify a directory on your computer for *Comicfy* to scan for **.cbr** files or you can do it your own style, categorizing it as you want, passing file by file.

## **Requirements**
- Have installed on your computer a .cbr file reader, most common its [CDisplay](http://www.cdisplay.me/)
- Also, you need to have installed a 7zip package to unzip files, you can install by runing the following code on Powershell
  ````
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
  Set-PSRepository -Name 'PSGallery' -SourceLocation "https://www.powershellgallery.com/api/v2" -InstallationPolicy Trusted
  Install-Module -Name 7Zip4PowerShell -Force
  ````
