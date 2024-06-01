import { ShowSuccessMessage, ShowErrorMessage } from "../AdminMenu.js";

export class MackbookDataModel 
{
    #brand;
    #category;
    #model;
    #processor;
    #CPU;
    #GPU;
    #memory;
    #RAM;
    #displaySize;
    #battery;
    #os;
    #camera;
    #color;
    #price;
    #descont_price;
    #description;
    #images;
    #incarousel;
    #status

    constructor(inputs, in_carousel, img_product_paths)
    {
        this.#brand = inputs[0].value;
        this.#category = inputs[1].value;
        this.#model = inputs[2].value;
        this.#processor = inputs[3].value;
        this.#CPU = inputs[4].value;
        this.#GPU = inputs[5].value;
        this.#memory = inputs[6].value;
        this.#RAM = inputs[7].value;
        this.#displaySize = inputs[8].value;
        this.#battery = inputs[9].value;
        this.#os = inputs[10].value;
        this.#camera = inputs[11].value;
        this.#color = inputs[12].value;
        this.#price = inputs[13].value;
        this.#descont_price = inputs[14].value;
        this.#description = inputs[15].value;
        this.#images = img_product_paths;
        this.#incarousel = in_carousel;
        this.#status = "not active";
    }

    async AddToLocalStorage() 
    {
        const data = 
        {
            brand: this.#brand,
            category: this.#category,
            model: this.#model,
            processor: this.#processor,
            CPU: this.#CPU,
            GPU: this.#GPU,
            memory: this.#memory,
            RAM: this.#RAM,
            displaySize: this.#displaySize,
            battery: this.#battery,
            os: this.#os,
            camera: this.#camera,
            color: this.#color,
            price: this.#price,
            descont_price: this.#descont_price,
            description: this.#description,
            images: this.#images,
            incarousel: this.#incarousel,
            status: this.#status
        };

        try 
        {
            const result_p = await window.electron.invoke('AddNewProductToLocalStorage', data);

            if (result_p.success)
            {
                await window.electron.invoke('AddNewProductImgToLocalStorage', this.#images);

                ShowSuccessMessage(result_p.message);

                return true;
            }
            else
            {
                ShowErrorMessage(result_p.message);

                return false;
            }
        } 
        catch (error) 
        {
            console.error('Error when adding data to local storage: ', error);
            return false;
        }
    }
}