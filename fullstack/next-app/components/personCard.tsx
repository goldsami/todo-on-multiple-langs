import {User} from "../models";

export default function PersonCard({person}: { person: User }) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48 is-square">
              <img className="is-rounded" src={person.image_url} alt="Placeholder image"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{person.name}</p>
            <p className="subtitle is-6">{person.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}