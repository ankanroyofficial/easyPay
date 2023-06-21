export const getTransactionNote = (val, language) => {

    var a = ""

    if (language == "pr") {
        if (val == "Funded" || val == "Funded.") {
            a = "برداشت از حساب بانکی و واریز به کیف پول ایران تسکر";
        } else if (val == "Payment Initiated") {
            a = "برداشت از کیف پول و پرداخت مبلغ پروژه به حساب امن ایران تسکر";
        }
        else if (val == "Commission deducted for booking fees.") {
            a = "پرداخت هزینه خدمات ایران تسکر";
        }
        else if (val == "Payment Initiated for increase payment") {
            a = "برداشت از کیف پول و پرداخت مبلغ پروژه به حساب امن ایران تسکر";
        }
        else if (val == " Withdrawals for payment release.")
            a = "آزادسازی مبلغ پروژه برای واریز به حساب مجری";
        else if (val == "Payment Release by Poster")
            a = "آزادسازی مبلغ پروژه از طرف کارفرما به کیف پول شما";
        else if (val == "Commission deducted for service fees.") {
            a = "پرداخت هزینه خدمات ایران تسکر";
        }
        else if (val == "Withdrawal request") {
            a = "برداشت از کیف پول ایران تسکر و واریز به حساب بانکی";
        }
        else if (val == "Commission deducted for dispute arbitration fees.") {
            a = "پرداخت هزینه داوری ایران تسکر";
        }
        else if (val == "Withdrawals for payment release.") {
            a = "آزادسازی مبلغ پروژه مورد اختلاف برای واریز به حساب مجری";
        }
        else if (val == "Dispute Amount is Refunded.") {
            a = "برگشت مبلغ پروژه مورد اختلاف به کیف پول شما";
        }else if (val == "Dispute Amount is released."||val=="Dispute Amount is released") {
            a = "آزادسازی مبلغ پروژه مورد اختلاف";
        }
    }
    return a;
}