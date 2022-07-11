<?php

namespace App\Exports;

use App\Models\User;
use App\Models\Users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Facades\Excel;

class PenRenExport implements FromCollection, WithEvents, WithHeadings
{
    public function collection()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        return DB::table('outer_equipment')
            ->select(DB::raw('place_first_lev, place_third_lev, equip_name, factory_number, state_tech_condition,year_toir,module_toir, module_replacement_name,
             act,act_link, dv,dv_link,vor,vor_link, include_toir_plan,include_toir_plan_link,done_toir_plan,done_toir_plan_link'))
            ->rightJoin('tehn_obsl_remont', 'outer_equipment.id', '=', 'tehn_obsl_remont.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $user)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        $styleArray = [
            'font' => [
                'bold' => true,
            ]
        ];
        return [
            AfterSheet::class => function (AfterSheet $event) use ($styleArray) {
                $event->sheet->getStyle('A1:O1')->applyFromArray($styleArray);
            }

        ];
    }

    public function headings(): array
    {
        return ["Объект", "Место", "Имя", "Номер", "Состояние", "НаКакойГодВкл.ТОиР",
            "МодульДляТОиР", "Замена", "Акт", "Акт ссылка", "ДВ", "ДВ ссылка", "ВОР",
            "ВОР ссылка", "Вкл.в план ТОиР", "Вкл.в план ТОиР ссылка", "Выполнен ТОиР", "Выполнен ТОиР ссылка",];
    }

}
