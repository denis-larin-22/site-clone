type StringOrNull = string | null;
type NumberOrNull = number | null;

// Product item from catalog
export interface IProductItem {
    // id: number,
    // name: string,
    // description: StringOrNull,
    // category_id: number,
    // price: {
    //     price_1: StringOrNull,
    //     price_2: StringOrNull,
    //     price_3: StringOrNull,
    //     price_4: StringOrNull,
    //     price_5: StringOrNull,
    //     sale_tk: StringOrNull
    // },
    // primary_price_index: number,
    // promo_offer: number,
    // availability: string,
    // stock_quantity: string,
    // category: ICategory,
    // collection_id: NumberOrNull,
    // design_id: NumberOrNull,
    // transparency_id: NumberOrNull,
    // // color_id: NumberOrNull,
    // discount_id: NumberOrNull,
    // availability_id: NumberOrNull,
    // technical_info: ITechnicalInfo
    // // image_url: StringOrNull
    // images_url: Array<string | null>
    // 
    id: number,
    name: string,
    category_id: number,
    availability: string,
    price: {
        price_1: StringOrNull,
        price_2: StringOrNull,
        price_3: StringOrNull,
        price_4: StringOrNull,
        price_5: StringOrNull,
        sale_tk: StringOrNull
    },
    category: {
        id: number,
        name: string
    },
    images_url: Array<string | null>,
    technical_info: {
        name: string,
        blackout: StringOrNull,
        water_resistance: StringOrNull
        fabric_texture: StringOrNull,
        composition: StringOrNull,
        warranty: StringOrNull,
        roll_width: NumberOrNull,
        tape_width: NumberOrNull,
        collection: StringOrNull,
        transparency: StringOrNull,
        color: StringOrNull,
        description: StringOrNull,
        max_width: NumberOrNull,
        max_height: NumberOrNull,
        max_area: NumberOrNull,
    }
}
// Product attributes
export interface ITechnicalInfo {
    darkness: StringOrNull,
    water_resistance: StringOrNull,
    fabric_texture: StringOrNull,
    composition: StringOrNull,
    warranty: StringOrNull,
    roll_width: StringOrNull,
    tape_width: StringOrNull,
    collection: StringOrNull,
    system: StringOrNull,
    transparency: StringOrNull,
    color: StringOrNull,
    description: StringOrNull,
}

export interface IColor {
    id: number,
    name: string,
}

export interface IDesign {
    id: number,
    name: string,
}

export interface ITransparencie {
    id: number,
    name: string,
}

export interface ICollection {
    id: number,
    name: string,
}

export interface ICategory {
    id: number,
    name: string,
}
// Filters
export interface IFilterOption {
    filter: string,
    title?: string,
    options: {
        id: number,
        name: string,
        icon?: string | JSX.Element
    }[],
    multichoice: boolean
}