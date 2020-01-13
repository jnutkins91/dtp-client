# The Data Trading Platform - Front End

Steps to deploy:

1. Run 'ng build --prod' in the project directory
2. Delete current 'dist' folder in GCP (Storage -> Browser -> dtp-front-end)
3. Upload newly generated 'dist' folder to the same location
4. Open the GCP terminal and run 'gsutil rsync -r gs://dtp-front-end ./angular-app-gcp'
5. Run 'cd angular-app-gcp'.
6. Run 'gcloud app deploy'.


* git add -A
* git commit -m "<message>"
* git push