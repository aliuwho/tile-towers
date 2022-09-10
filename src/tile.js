import React from 'react';
import {TILE_DIM} from "./util";

// NOTE: palette is colorblind friendly :)
const Color = {
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

const TILE_WIDLEN = TILE_DIM * 12 / 10;

export class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* TODO add dynamic shading / 3d qualities so its easy to tell diff tiles */
        if (this.props.type === -1) {
            return this.renderInvisibleTile();
        }
        if (this.props.selected === this.props.index) {
            return this.renderSelectedTile();
        }
        return this.renderUnselectedTile();
    }

    renderInvisibleTile() {
        return (
            <svg className="tile-invisible"
                 style={this.props.style}
                 width={TILE_WIDLEN + "px"}
                 height={TILE_WIDLEN + "px"}>
            </svg>);
    }

    renderSelectedTile() {
        return (
            <svg className="tile-selected"
                 style={this.props.style}
                 width={TILE_WIDLEN + "px"}
                 height={TILE_WIDLEN + "px"}
                 onClick={() => {
                     this.props.handler(this.props.index);
                 }}>
                <image href={require("./images/temp-tile.png")}
                       style={this.props.style}
                       width={TILE_WIDLEN + "px"}
                       height={TILE_WIDLEN + "px"}
                       onClick={() => {
                           this.props.handler(this.props.index);
                       }}/>
                <text x="0" y="30" fill={Color.GREY}>{this.props.right}</text>
            </svg>);
    }

    renderUnselectedTile() {
        return (
            <svg className="tile"
                 style={this.props.style}
                 width={TILE_WIDLEN + "px"}
                 height={TILE_WIDLEN + "px"}
                 onClick={() => {
                     this.props.handler(this.props.index);
                 }}>
                <image href={require("./images/temp-tile.png")}
                       style={this.props.style}
                       width={TILE_WIDLEN + "px"}
                       height={TILE_WIDLEN + "px"}
                       onClick={() => {
                           this.props.handler(this.props.index);
                       }}/>
                <text x={TILE_WIDLEN/2} y={TILE_WIDLEN/2} fill={Color.RED}>{this.props.right}</text>
            </svg>
        );
    }

    getColor() {
        if (this.props.type === -1) {
            return Color.GREEN;
        }
        switch (this.props.type % 4) {
            case 0:
                return Color.RED;
            case 1:
                return Color.YELLOW;
            case 2:
                return Color.WHITE;
            default:
                return Color.BLUE;
        }
    }
}