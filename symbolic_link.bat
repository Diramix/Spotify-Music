@echo off
set "theme=Spotify Music! II"
set "target=%APPDATA%\PulseSync\addons\%theme%"
set "link=%CD%\%theme%"

if exist "%target%" (
    echo Removing existing folder: "%target%"
    rmdir /s /q "%target%"
)

echo Creating symbolic link: "%target%" -> "%link%"
mklink /d "%target%" "%link%"

echo Opening folder: "%APPDATA%\PulseSync\addons"
explorer "%APPDATA%\PulseSync\addons"