import React from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = "https://api.unsplash.com/photos/";
const searchUrl = "https://api.unsplash.com/search/photos";

function App() {
  const [photos, setPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const fetchPhoto = async () => {
    let url;
    const pageUrl = `&page=${page}`;
    const queryUrl = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${pageUrl}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientID}${pageUrl}`;
    }
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      // wipe out of every thing only new query pics putting in setPhote the first time
      // if (query && page === 1) {
      //   setPhotos((oldPhotos) => {
      //     return data.results;
      //   });
      // } else if (query) {
      //   setPhotos((oldPhotos) => {
      //     return [...oldPhotos, ...data.results];
      //   });
      // } else {
      //   setPhotos((oldPhotos) => {
      //     return [...oldPhotos, ...data];
      //   });
      // }
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchPhoto();
  }, [page]);

  React.useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => {
      window.removeEventListener("scroll", event);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };
  return (
    <div className="">
      <section className="w-11/12 md:w-5/6 mx-auto">
        <form
          className="flex md:w-1/2 w-full my-8 border-b-4 border-blue-400 bg-blue-100 rounded-t-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Suche ..."
            className="flex-grow bg-blue-100 rounded md:text-3xl text-xl pl-4"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button className="px-4" type="submit">
            <FaSearch></FaSearch>
          </button>
        </form>
        <article className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {photos.map((item) => {
            return <Photo key={item.id} {...item}></Photo>;
          })}
        </article>
        {loading && <h2 className="text-center text-xl">Loading...</h2>}
      </section>
    </div>
  );
}

export default App;
