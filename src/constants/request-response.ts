import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

// import { CategoryService } from 'server/dashboard/category/category.service';

// import { StatusI } from '@shared/interfaces';
// import { CategoryDTO, CategoryEditDTO } from '@shared/dtos';

export interface StatusI {
    success: boolean;
    statusCode?: number;
    message?: StatusMessageI[];
    error?: string;
}

export interface StatusMessageI {
    [index: string]: [
        {
            message: string;
        }
    ]
}

export interface RequestResponseI {
    status: StatusI,
    data?: any
}

export interface SuccessRequestResponseI extends RequestResponseI {
    data: any
}

export const successStatus: StatusI = { success: true };

export const getSuccessRequestResponse = (data: any) => {
    const response: RequestResponseI = {
        status: successStatus,
        data
    }
    return response;
}

export const  getErrorRequestResponse = (error: any) => {
    const response: RequestResponseI = {
        status: {
            success: false,
            statusCode: error.status,
            message: error.response,
        }
    }
    return response;
}



// @ApiTags('Dashboard: Category')
// @Controller('category')
// export class CategoryController {
//     constructor(private categoryService: CategoryService) { }

//     @Get('/all')
//     @ApiOperation({
//         summary: 'Full list of categories',
//     })
//     async getCategoriesList() {
//         try {
//             const data = await this.categoryService.getCategoriesList();
//             return getSuccessRequestResponse(data);
//         } catch (error) {
//             return getErrorRequestResponse(error);
//         }
//     }

//     @Get('/all/materials')
//     @ApiOperation({
//         summary: 'Full list of categories with materials',
//     })
//     async getCategoriesWithMaterials() {
//         let status: StatusI = {
//             success: true,
//         };

//         try {
//             const data = await this.categoryService.getCategoriesWithMaterials();

//             return {
//                 status,
//                 data,
//             };
//         } catch (error) {
//             status = {
//                 success: false,
//                 statusCode: error.status,
//                 message: error.response,
//             };
//         }

//         return {
//             status,
//         };
//     }

//     @Post('/add')
//     @ApiOperation({
//         summary: 'Creating a new category',
//     })
//     async addCategoryItem(@Body() categoryDTO: CategoryDTO) {
//         let status: StatusI = {
//             success: true,
//         };

//         try {
//             const data = await this.categoryService.addCategoryItem(categoryDTO);

//             return {
//                 status,
//                 data,
//             };
//         } catch (error) {
//             status = {
//                 success: false,
//                 statusCode: error.status,
//                 message: error.response,
//             };
//         }

//         return {
//             status,
//         };
//     }

//     @Get('/:id')
//     @ApiOperation({
//         summary: 'Category item',
//     })
//     async getCategoryItem(@Param('id') id: number) {
//         let status: StatusI = {
//             success: true,
//         };

//         try {
//             const data = await this.categoryService.getCategoryItem(id);

//             return {
//                 status,
//                 data,
//             };
//         } catch (error) {
//             status = {
//                 success: false,
//                 statusCode: error.status,
//                 message: error.response,
//             };
//         }

//         return {
//             status,
//         };
//     }

//     @Post('/:id/edit')
//     @ApiOperation({
//         summary: 'Edit category item',
//     })
//     async editCategoryItem(@Param('id') id: number, @Body() categoryEditDTO: CategoryEditDTO) {
//         categoryEditDTO.id = id;

//         let status: StatusI = {
//             success: true,
//         };

//         try {
//             const data = await this.categoryService.editCategoryItem(categoryEditDTO);

//             return {
//                 status,
//                 data,
//             };
//         } catch (error) {
//             status = {
//                 success: false,
//                 statusCode: error.status,
//                 message: error.response,
//             };
//         }

//         return {
//             status,
//         };
//     }

//     @Post('/:id/remove')
//     @ApiOperation({
//         summary: 'Remove category item',
//     })
//     async removeCategoryItem(@Param('id') id: number) {
//         let status: StatusI = {
//             success: true,
//         };

//         try {
//             await this.categoryService.removeCategoryItem(id);
//             const data = await this.categoryService.getCategoriesList();
//             return {
//                 status,
//                 data,
//             };
//         } catch (error) {
//             console.log('error', error);

//             status = {
//                 success: false,
//                 statusCode: error.status,
//                 message: error.response,
//             };
//         }

//         return { status };
//     }
// }
