export class ButtonDatatable {
    public static sap(id: string, disabled: boolean = false, role?: string): string {
        if ('MAINTAIN' == role || 'APPROVE' == role) {
            if (disabled) {
                return `<button class="btn btn-success btn-sm" data-toggle="tooltip" title="ส่งข้อมูลเข้าระบบ SAP" id="${id}" disabled>
                <i class="fa fa-share-square-o" aria-hidden="true"></i>
                </button>`;
            } else {
                return `<button class="btn btn-success btn-sm" data-toggle="tooltip" title="ส่งข้อมูลเข้าระบบ SAP" id="${id}" >
              <i class="fa fa-share-square-o" aria-hidden="true"></i>
              </button>`;
            }
        } else {
            return ``;
        }
    }

    public static custom(id: string, title: string, color: string = 'info', icon: string = 'fa fa-search', disabled: boolean = false): string {
        if (disabled) {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-${color} btn-sm" id="${id}" disabled>
            <i class="${icon}" aria-hidden="true"></i> 
            </button>`;
        } else {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-${color} btn-sm" id="${id}">
            <i class="${icon}" aria-hidden="true" style="color: white;"></i> 
            </button>`;
        }
    }

    public static cancel(id: string, title: string, disabled: boolean = false): string {
        if (disabled) {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-danger btn-sm" id="${id}" disabled>
            <i class="fa fa-times" aria-hidden="true"></i> 
            </button>`;
        } else {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-danger btn-sm" id="${id}">
            <i class="fa fa-times" aria-hidden="true"></i> 
            </button>`;
        }
    }

    public static change(id: string, title: string, disabled: boolean = false): string {
        if (disabled) {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-warning btn-sm" id="${id}" disabled>
            <i class="fa fa-retweet" aria-hidden="true"></i> 
            </button>`;
        } else {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-warning btn-sm" id="${id}">
            <i class="fa fa-retweet" aria-hidden="true"></i> 
            </button>`;
        }
    }

    public static edit(id: string, title: string = 'แก้ไข', disabled: boolean = false): string {
        if (disabled) {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-warning btn-sm" id="${id}" disabled>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
            </button>`;
        } else {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-warning btn-sm" id="${id}">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
            </button>`;
        }
    }

    public static detail(id: string, title: string = 'ดูรายละเอียด', disabled: boolean = false): string {
        if (disabled) {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-info btn-sm" id="${id}" disabled>
        <i class="fa fa-search" aria-hidden="true"></i> 
        </button>`;
        } else {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-info btn-sm" id="${id}">
        <i class="fa fa-search" aria-hidden="true"></i> 
        </button>`;
        }
    }

    public static delete(id: string, title: string = 'ลบข้อมูล', disabled: boolean = false): string {
        if (disabled) {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-danger btn-sm" id="${id}" disabled>
        <i class="fa fa-trash" aria-hidden="true"></i> 
        </button>`;
        } else {
            return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-danger btn-sm" id="${id}">
        <i class="fa fa-trash" aria-hidden="true"></i> 
        </button>`;
        }
    }

    public static deleteAdmin(id: string, title: string = 'ลบข้อมูล', disabled: boolean = false, role?: string): string {
        if ('MAINTAIN' == role || 'APPROVE' == role) {
            if (disabled) {
                return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-danger btn-sm" id="${id}" disabled>
                <i class="fa fa-trash" aria-hidden="true"></i> 
                </button>`;
            } else {
                return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-danger btn-sm" id="${id}">
        <i class="fa fa-trash" aria-hidden="true"></i> 
        </button>`;
            }
        } else {
            return ``;
        }
    }

    public static history(id: string, title: string = 'ประวัติ'): string {
        return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-success btn-sm" id="${id}">
        <i class="fa fa-history" aria-hidden="true"></i> 
        </button>`;
    }

    public static remark(id: string, title: string = 'หมายเหตุ'): string {
        return `<button type="button" data-toggle="tooltip" title="${title}" class="btn btn-info btn-sm" id="${id}">
        <i class="fa fa-search" aria-hidden="true"></i> 
        </button>`;
    }

    public static cndn(id: string): string {
        return `<button class="btn btn-primary btn-sm" style="padding: 2px" data-toggle="tooltip" title="ลด/เพิ่มหนี้" id="${id}">
        <img style="color: #ffffff ; height: 20px; width: 20px; " src="assets/PlusDec_icon.png" /></button>`;
    }

    public static download(id: string, title: string, ): string {
        return `<button class="btn btn-info btn-sm"  data-toggle="tooltip" title="${title}" id="${id}">
        <i class="fa fa-paperclip" aria-hidden="true"></i> </button>`;
    }

    public static iconpfd(id: string): string {
        return `<button class="btn btn-light btn-sm" data-toggle="tooltip" title="ดาวน์โหลดใบชำระเงิน" " id="${id}">
        <i class="fa fa-file-pdf-o" style="color:red" aria-hidden="true"></i>
        </button>`;
    }

    public static downloadFile(id: string, title: string, disabled: boolean = false, ): string {
        if (disabled) {
            return `<button class="btn btn-info btn-sm"  data-toggle="tooltip" title="${title}" id="${id}" disabled>
            <i class="fa fa-download" aria-hidden="true"></i> </button>`;
        } else {
            return `<button class="btn btn-info btn-sm"  data-toggle="tooltip" title="${title}" id="${id}">
            <i class="fa fa-download" aria-hidden="true"></i> </button>`;
        }
    }
} `  `