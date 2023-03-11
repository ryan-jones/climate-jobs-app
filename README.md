# Climate Job App

This is a small application that aggregates climate jobs from the top climate job boards.

- The backend is built with Flask. It runs a web scraper to collect job postings from various climate job boards and aggregates them based on recency.

- To prevent excessive and expensive calls every time a resource is requested, the app stores the latest jobs temporarily in a database.

- Requests for jobs and other related data is made through a REST API exposed by the Flask app.

- A scheduler handles refreshing the aggregate job feed every half an hour.

- The UI is served with React and Typescript.

The app can be viewed [here](https://vercel.com/ryanllewellynjones-gmailcom/climate-jobs-app/541q9wiXd8QpeCvbGFZ8NjHGDVRv)
