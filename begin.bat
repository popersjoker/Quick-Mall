echo %0%1
if "%1"== "."  ( 
    npm run dev
 ) else ( 
    npm run vue 
    ) 

pause 
