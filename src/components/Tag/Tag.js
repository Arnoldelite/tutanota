import React from 'react';

const Tag = ({name}) => {
	return (
		<span
              key={Math.random()}
              className="react-tag-component--tags"
              style={{
                fontFamily: "arial",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#1976D2",
                color: "#fff",
                fontSize: "14px",
                minWidth: "100px",
                height: "30px",
                padding: "0 15px",
                marginRight: "20px",
              }}
            >
              {name}
        </span>
	);
}

export default Tag;