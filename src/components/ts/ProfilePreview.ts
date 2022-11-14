import swal from 'sweetalert2';
import BaseMethod from "./BaseMethod";

export default class ProfileBirthday extends BaseMethod {

    public async action(form: Array<any>): Promise<any> {
        let text = '';
        for (let i = 0; i < form.length; i++) {
            switch (form[i].id) {
                case 'setting-self-introduction':
                    text += `<div><strong>${i + 1} ${form[i].label}</strong></div><div style='white-space: pre-wrap; text-align: left; margin: 0 50px 20px 50px; border: solid #d4d4d4; border-block-style: none;'>${form[i].value}</div>`
                    break;
                default:
                    text += `<div><strong>${i + 1} ${form[i].label}</strong></div><div style='margin: 0 50px 20px 50px; border: solid #d4d4d4; border-block-style: none;'>${form[i].value}</div>`
                    break;
            }

        }

        await swal.fire({ title: 'プレビュー', html: text, });

        return form;
    }
}