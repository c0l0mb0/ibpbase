jQuery(function ($) {
    actionMenu.hideALl();
    // addApplicationConteinerHTML();
    // changePageTitle("Все оборудовние и компоненты");
    $('.all-equip').hide();
    $('.edit-elements').hide();
    $('#dropdownMenuView').hide();
});




function changePageTitle(page_title) {

    $('#page-title').text(page_title);

    document.title = page_title;
}







