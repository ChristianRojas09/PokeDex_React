# ReadMe
---
This a modern PokeDex app using React, PokeAPI, and Material UI. It contains all Pokemon from generation 8 and below.

As a long-time Pokemon fan, I wanted to build an app where I could access the different Pokemon and their basic information. I use this application when playing video games or the trading card game. This app allows me to 

I learned a lot with this app. It was my first time using the PokeAPI - which provided its challenges. I used Axios to send the app's requests to the correct API endpoints. Fortunately, PokeAPI is well-documented, and after some time reading through the documentation I was able to get a good enough understanding to manipulate the data and populate it onto the app.

I used the Material UI component library for this project, and while I did enjoy using it I have found others that I would use over MUI (ShadCN is quite good). 

Setting up all of the filters was a challenge. I created props for all of the regions, types, IDs, and names. This way I could pass information retrieved from the API into the prop. I then filtered the props based on their value. 

Ex: if region name = Kanto and the ID number was **less than 151** then all Pokemon with less than 151 ID numbers were sorted into that region.

---

## Features:

- Filter Pokemon based on their type and region
- Search Pokemon by their name or ID number
- View base stats of Pokemon
- View evolution chain

---

## Demo:
Clicking into a Pokemon's card:
![Pokedex](./public/demo/pokedexDemo1.gif)
Using the search and filter functions:
![Pokedex](./public/demo/pokedexDemo2.gif)

---
## To Do:

- Update to React 18
- Migrate Material UI (searching for different styling libraries)
- Add map function
---
## Cloning and Running the Application in local
---
Clone the project into local

Install all the npm packages. Go into the project folder and type the following into your terminal:

```bash
npm install
```

To run the application Type the following command in your terminal:

```bash
npm start
```

Run the application on **localhost:3000**
