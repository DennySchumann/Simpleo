import {Schema, model} from 'mongoose';

/**
 * contains the schema for the event
 */
let events_Schema: Schema = new Schema({
    tag: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    tag_sort: {
        type: String,
        lowercase: true,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        default: ""
    },
    title_sort: {
        type: String,
        lowercase: true,
        trim: true,
        default: ""
    },
    subtitle: {
        type: String,
        trim: true,
        default: ""
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    image_header: {
        type: Date,
        default: null
    },
    image_header_filetype: {
        type: String,
        default: null
    },
    image_header_preview: {
        type: String,
        default: null
    },
    image_logo: {
        type: Date,
        default: null
    },
    image_logo_filetype: {
        type: String,
        default: null
    },
    date_start: {
        type: Date,
        default: Date.now()
    },
    date_end: {
        type: Date,
        default: null
    },
    color: {
        primary: {
            type: String,
            default: "ff385d"
        },
        primary_txt: {
            type: String,
            default: "000000"
        },
        darken: {
            type: String,
            default: "ff0a38"
        },
        darken_txt: {
            type: String,
            default: "000000"
        },
        lighten: {
            type: String,
            default: "ffcfd8"
        },
        lighten_txt: {
            type: String,
            default: "000000"
        },
        accent: {
            type: String,
            default: "0475ce"
        },
        accent_txt: {
            type: String,
            default: "ffffff"
        },
        tetrad: {
            first: {
                type: String,
                default: "c0ff38"
            },
            first_txt: {
                type: String,
                default: "000000"
            },
            second: {
                type: String,
                default: "38ffda"
            },
            second_txt: {
                type: String,
                default: "000000"
            },
            third: {
                type: String,
                default: "7638ff"
            },
            third_txt: {
                type: String,
                default: "ffffff"
            }
        },
        background: {
            type: String,
            default: "ffffff"
        },
        background_txt: {
            type: String,
            default: "000000"
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    broadcasters: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'EventRole'
        },
        _id: false
    }],
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        default: []
    }],
    bookmarks: {
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        default: null
    },
    bookmark_playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        defaul: []
    }],
    boards: [{
        type: Schema.Types.ObjectId,
        ref: 'MediaBoard',
        default: []
    }],
    main_board: {
        type: Schema.Types.ObjectId,
        ref: 'MediaBoard',
        default: null
    },
    bitrate: {
        type: Number,
        default: 800
    },
    published: {
        type: Date,
        default: null
    },
    visibility: {
        type: Boolean,
        default: true
    },
    private_broadcasting: {
        type: Boolean,
        default: false
    },
    trusted_broadcasting: {
        type: Boolean,
        default: false
    },
    viewer_code: {
        type: String,
        default: ""
    },
    broadcaster_code: {
        type: String,
        default: ""
    },
    cta_text: {
        type: String,
        default: ""
    },
    main_stream: {
        type: String,
        default: ""
    },
    main_live: {
        type: Boolean,
        default: false
    },
    reset: Date,
    social_members: {
        flimme_members: {
            type: [String],
            default: []
        },
        twitter_members: {
            type: [String],
            default: []
        },
        instagram_members: {
            type: [String],
            default: []
        }
    },
    package: {
        type: Schema.Types.ObjectId,
        ref: 'Package'
    },
    old_id: {
        tyoe: Number,
        default: 0
    },
    media_visible: [{
        type: Schema.Types.ObjectId,
        ref: 'Media'
    }],
    media_invisible: [{
        type: Schema.Types.ObjectId,
        ref: 'Media'
    }]
});

export default model('events', events_Schema);