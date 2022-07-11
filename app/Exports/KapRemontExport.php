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


class KapRemontExport implements FromCollection, WithEvents, WithHeadings
{
    public function collection()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        return DB::table('outer_equipment')
            ->select(DB::raw('place_first_lev, place_third_lev, equip_name, factory_number, state_tech_condition,year_cap_remont,replacement_name,
               act,act_link, dv,  dv_link, vor , vor_link, include_kr_plan,include_kr_plan_link, done_kr_plan, done_kr_plan_link '))
            ->rightJoin('kap_remont', 'outer_equipment.id', '=', 'kap_remont.outer_id')
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
        return ["Объект", "Место", "Имя", "Номер", "Состояние", "НаКакойГодВкл.КР", "Замена", "Акт", "Акт ссылка", "ДВ", "ДВ ссылка",
            "ВОР", "ВОР ссылка", "Включен в план КР", "Включен в план КР ссылка", "Выполнен КР", "Выполнен КР ссылка",];
    }

}
