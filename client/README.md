This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Architecture

The project's architecture is inspired by the [https://feature-sliced.design/en/docs/get-started/quick-start](Feature-sliced design) specification.

It's feature-based where we could group all functional code related to an application feature inside a directory so that a developer can concentrate only on the particular directory.


└── src/
    ├── pages/                                          # Initializing applicationlogic
         ├── _app.tsx                                   # ApplicationEntryPoint        
         ├── api/                                       # API's
         ├── index.tsx                                  # Home Page
         ├── page-A/
            - index.ts                                  # page entry point
            ├── page-A.tsx                              # component entry point
            ├── Page-Afeatures/                         # Features folder
                ├──feature-A/                           # a feature
                    - index.ts                          # feature entry point
                    ├──components/                      # featureA components
                        ├──index.ts                     # featureA components
                        ├── component-A/                # component 4 the feature
                            ├── index.ts                # component entry point
                            ├── index.scss              # component styles
                            ├── component.tsx           # component code
                    ├──hooks/                           # hooks for the feature
                    ├──state/                           # actions and reducers
                        ├──feature-A.actions.js
                        ├──feature-A.reducers.js
        ├── styles/
            ├──index.scss                           # connecting all styles
            ├──normalize.scss                       # normalizing styles
            ├──var.scss                             # Global css variables 
                   
    ├── shared/                                     # Shared hooks and components
            ├──components/                          # components specific to this feature
                  ├──index.ts                       # entry point for the components
                  ├── component-B/                  # similar component folder structure
               ├──hooks/                            # shared hooks
               ├──state/                            # shared actions & reducers
                  ├──actions.js
                  ├──reducers.js
            ├── constants/                          # constants
    ├── store/                                      # redux store



Basically,
```
  Application --> Pages --> Features --> Components & Utilities
```

Every page is split into self-contained, user-facing, reusable building blocks known as features.
Features do not depend on other features

For shared components and utilities, they are stored in the ```shared``` folder.

### Code stored in this folder:
1. Is needed in at least two places
2. Has low frequenc of change
3. Uses pure functions
4. Any change is throughly tested and reviewed


## Learn More
### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
