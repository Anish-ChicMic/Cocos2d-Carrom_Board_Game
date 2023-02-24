import { _decorator, Component, Node, Button, Input, ScrollView, ScrollBar, instantiate, Prefab, Label, JsonAsset, EditBox, director } from 'cc';
import { scriptOnItemOfScrollView } from './scriptOnItemOfScrollView';
const { ccclass, property } = _decorator;

@ccclass('registerUser')
export class registerUser extends Component {

    @property({ type: [Node] })
    fields: Node[] = []

    @property(Prefab)
    countryItem: Prefab | null = null;

    @property(JsonAsset)
    jsonFile: JsonAsset | null = null;

    countryFields: Node | null = null;
    onLoad() {
        this.countryFields = this.fields[5];

        this.fields[6].on(Input.EventType.MOUSE_DOWN, this.getUserData, this);

        let countryField = this.fields[5];
        let contryScrollViews = countryField.children[1].children[1];
        contryScrollViews.active = false;
        // countryField.on(Input.EventType.MOUSE_DOWN, this.addDropDown, this);

    }


    start() {

    }

    update(deltaTime: number) {

    }

    getUserData() {
        console.log("submit button!");
        // let registerForm = this.node.getComponent()
        let data = {}
        let fname = this.fields[0].getChildByName("Fname").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;
        let lname = this.fields[0].getChildByName("Lname").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;

        let email = this.fields[1].getChildByName("emailCont").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;

        let pwd = this.fields[2].getChildByName("pwd").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;
        let cnfPwd = this.fields[2].getChildByName("cnfPwd").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;

        let mobileNo = this.fields[3].getChildByName("mobileCont").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;

        let genders = this.fields[4].getChildByName("options").children;
        let gender = null;
        genders.forEach(gen => {

            let chm = gen.getChildByName("Checkmark");
            if (chm.active) {
                gender = gen.getChildByName("Label").getComponent(Label).string;
                return;
            }
        });

        let country = this.fields[5].getChildByName("countryCont").children[0].getComponent(EditBox).textLabel.getComponent(Label).string;

        data["name"] = { "fname": fname, "lname": lname };
        data["email"] = email;
        data["password"] = (pwd === cnfPwd) ? pwd : null;
        data["country"] = country;
        data["gender"] = gender;
        data["mobile"] = mobileNo;

        console.log("data is : ");
        console.log(data);

        if (this.isDataValid(data)) {
            this.login(data);
        }


    }

    isDataValid(data: object): boolean {
        const input_fields = {
            name: /^[A-Za-z. ]{3,30}$/,
            email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
            password: /^[#\w@_-]{8,20}$/,
            telephone: /^\d{11}$/,
        }

        if (!input_fields["name"].test(data["name"]["fname"]) || !input_fields["name"].test(data["name"]["lname"])) {
            console.log("Name Invalid!");
            return false;
        }
        if (!input_fields["email"].test(data["email"])) {
            console.log("Email Invalid!");
            return false;
        }
        if (!input_fields["password"].test(data["password"])) {
            console.log("password Invalid!");
            return false;
        }
        if (!input_fields["telephone"].test(data["mobile"])) {
            console.log("Mobile No. Invalid!");
            return false;
        }
        if (!input_fields["email"].test(data["email"])) {
            console.log("Email Invalid!");
            return false;
        }


        return true;

    }




    addDropDown() {
        console.trace("Test")
        let countryCont = this.fields[5].children[1];

        let contryEditBox = countryCont.children[0];
        let contryScrollView = countryCont.children[1];

        // contryEditBox.active = false;
        contryScrollView.active = true;

        let newCountries: [] = this.jsonFile.json.countries;
        newCountries.forEach(country => {
            console.log("adding country: " + country);
            let newCountry = instantiate(this.countryItem);
            newCountry.getComponent(Label).string = country;
            contryScrollView.getComponent(ScrollView).content.addChild(newCountry);


            newCountry.on(Input.EventType.MOUSE_DOWN, (target) => { this.addCountry(target) });
        });

    }

    addCountry(target) {
        let countryName = target.target.getComponent(Label).string;
        // let countryField = this.fields[5];
        let contryEditBox = this.countryFields.children[1].children[0];
        let contryScrollView = this.countryFields.children[1].children[1];
        console.log("Scroll view", contryScrollView)

        console.log("In add country func" + target.target.getComponent(Label).string);

        contryEditBox.children[1].active = false; // disappearing placeholder
        contryEditBox.children[0].active = true;  // appearing editbox
        contryEditBox.children[0].getComponent(Label).string = countryName;
        contryScrollView.active = false;
        console.log(contryScrollView.active);
        console.log(this);

    }

    login(data: object) {
        let APIKEY = 'HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR';
        let req = new XMLHttpRequest();
        req.open("POST", "http://3.18.231.59:4002/v1/user/register");

        req.setRequestHeader('Content-type', 'application/json');
        req.setRequestHeader('apiKey', APIKEY);

        // let data = {
        //     email: 'harpinder.singh@chicmic.co.in',
        //     password: '12345678'
        // }

        req.onreadystatechange = () => {//Call a function when the state changes.
            if (req.readyState == 4 && req.status == 200) {
                alert(req.responseText);
                console.log(req.response);
            }
        }

        let jsonStr = JSON.stringify(data);
        req.send(jsonStr);
        console.log(jsonStr);
        director.loadScene("gamePlay");
    }

}

