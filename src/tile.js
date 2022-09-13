import React from 'react';
import {TILE_DIM} from "./util";

// NOTE: palette is colorblind friendly :)
const COLOR = {
    RED: "rgb(238,102,119)",
    YELLOW: "rgb(204,187,68)",
    GREEN: "rgb(34,136,51)",
    WHITE: "rgb(255,255,255",
    BLACK: "rgb(0,0,0)",
    BLUE: "rgb(68,119,170)",
    PURPLE: "rgb(170,51,119)",
    CYAN: "rgb(102,204,238)",
    GREY: "rgb(187,187,187)"
}

const IMAGES = [require('./images/tile-01.png'), require('./images/tile-02.png'),
    require('./images/tile-03.png'), require('./images/tile-04.png'),
    require('./images/tile-05.png'), require('./images/tile-06.png'),
    require('./images/tile-07.png'), require('./images/tile-08.png'),
    require('./images/tile-09.png'), require('./images/tile-10.png'),
    require('./images/tile-11.png'), require('./images/tile-12.png'),
    require('./images/tile-13.png'), require('./images/tile-14.png'),
    require('./images/tile-15.png'), require('./images/tile-16.png'),
    require('./images/tile-17.png'), require('./images/tile-18.png'),
    require('./images/tile-19.png'), require('./images/tile-20.png'),
    require('./images/tile-21.png'), require('./images/tile-22.png'),
    require('./images/tile-23.png'), require('./images/tile-24.png'),
    require('./images/tile-25.png'), require('./images/tile-26.png'),
    require('./images/tile-27.png'), require('./images/tile-28.png'),
    require('./images/tile-29.png'), require('./images/tile-30.png'),
    require('./images/tile-31.png'), require('./images/tile-32.png'),
    require('./images/tile-33.png'), require('./images/tile-34.png'),
    require('./images/tile-35.png'), require('./images/tile-36.png'),];

const TILE_WIDLEN = TILE_DIM * 12 / 10;

export class Tile extends React.Component {

    render() {
        /* TODO add dynamic shading / 3d qualities so its easy to tell diff tiles */
        if (this.props.type === -1) {
            return this.renderInvisibleTile();
        }
        if (this.props.selected === this.props.index) {
            return this.renderVisibleTile("tile-selected");
        }
        return this.renderVisibleTile("tile");
    }

    renderInvisibleTile() {
        return (
            <svg className="tile-invisible"
                 width={TILE_WIDLEN + "px"}
                 height={TILE_WIDLEN + "px"}>
            </svg>);
    }

    renderVisibleTile(className) {
        return (
            <svg className={className}
                 key={this.props.index}
                 style={this.props.style}
                 width={TILE_WIDLEN + "px"}
                 height={TILE_WIDLEN + "px"}
                 onClick={() => {
                     this.props.handler(this.props.index);
                 }}>
                <image className={this.props.index + this.props.type}
                       href={IMAGES[this.props.type]}
                       style={this.props.style}
                       width={TILE_WIDLEN + "px"}
                       height={TILE_WIDLEN + "px"}
                       onClick={() => {
                           this.props.handler(this.props.index);
                       }}/>
                <text x={TILE_WIDLEN / 2} y={TILE_WIDLEN / 2} fill={COLOR.WHITE}>{this.props.right}</text>
            </svg>
        );
    }

    getColor() {
        if (this.props.type === -1) {
            return COLOR.GREEN;
        }
        switch (this.props.type % 4) {
            case 0:
                return COLOR.RED;
            case 1:
                return COLOR.YELLOW;
            case 2:
                return COLOR.WHITE;
            default:
                return COLOR.BLUE;
        }
    }
}