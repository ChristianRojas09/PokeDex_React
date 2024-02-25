import React from 'react';

//create filter component for region, type, sort by, and search
class Filters extends React.Component {

    openGithub = () => {
        window.open("https://github.com/ChristianRojas09");
    }

    render() {
        return (
            <>
                <div className="filter_container noselect">
                    <div className="filter_items">
                        <div>
                            Region
                        </div>
                        <select value={this.props.valueregion} onChange={this.props.regionsSelect}>
                            {this.props.regions.map((region) => (
                                <option
                                    key={region.name}
                                    value={region.name}>{region.name}&nbsp;({region.offset + 1}-{region.limit + region.offset})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter_items">
                        <div>
                            Type
                        </div>
                        <select value={this.props.valuetype} onChange={this.props.typesSelect}>
                            {this.props.types.map((type) => (
                                <option
                                    key={type}
                                    value={type}>{type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter_items">
                        <div>
                            Sort by
                        </div>
                        <select value={this.props.sorttype} onChange={this.props.sortSelect}>
                            {this.props.sortby.map((sort) => (
                                <option
                                    key={sort}
                                    value={sort}>{sort}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter_items">
                        <label>
                            Search
                        </label>
                        <input type="text" value={this.props.valuesearch} onChange={this.props.searchChange} />
                    </div>
                </div>
            </>
        )
    }
}

export default Filters;