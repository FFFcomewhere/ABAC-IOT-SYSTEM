
<template>
    <div>
        <el-tabs v-model="activeTab">
            <el-tab-pane label="device" name="tab1">

                <el-button type="primary" @click="handleAddDevice">新增设备</el-button>
                <el-table :data="deviceData" border>
                    <el-table-column prop="name" label="设备名"></el-table-column>
                    <el-table-column prop="state" label="设备状态"></el-table-column>
                    <el-table-column prop="power" label="设备电量"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="handleUpdateDevice(row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="deleteDevice(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog v-model="updateDialogVisible" title="更新设备信息">
                    <el-form :model="deviceForm" ref="deviceForm" :rules="deviceRules">
                        <el-form-item label="设备名称" prop="name">
                            <el-input type="text" v-model="deviceForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="设备状态" prop="state">
                            <el-input type="text" v-model="deviceForm.state"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="updateDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateDevice">确 定</el-button>
                    </div>
                </el-dialog>

                <el-dialog v-model="addDialogVisible" title="新增设备">
                    <el-form :model="deviceForm" ref="deviceForm" :rules="deviceRules">
                        <el-form-item label="设备名称" prop="name">
                            <el-input type="text" v-model="deviceForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="设备状态" prop="state">
                            <el-input type="text" v-model="deviceForm.state"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addDevice">确 定</el-button>
                    </div>
                </el-dialog>

            </el-tab-pane>

            <el-tab-pane label="policy" name="tab2">
                <el-button type="primary" @click="handleAddPolicy">新增策略</el-button>
                <el-table :data="policyData" border>
                    <el-table-column prop="role" label="角色"></el-table-column>
                    <el-table-column prop="deviceName" label="设备名"></el-table-column>
                    <el-table-column prop="operation" label="操作类型"></el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" @click="handleUpdatePolicy(row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="deletePolicy(row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog v-model="updateDialogVisiblePolicy" title="更新策略信息">
                    <el-form :model="policyForm" ref="policyForm" :rules="policyRules">
                        <el-form-item label="角色" prop="role">
                            <el-input type="text" v-model="policyForm.role"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称" prop="deviceName">
                            <el-input type="text" v-model="policyForm.deviceName"></el-input>
                        </el-form-item>
                        <el-form-item label="操作" prop="operation">
                            <el-input type="text" v-model="policyForm.operation"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="updateDialogVisiblePolicy = false">取 消</el-button>
                        <el-button type="primary" @click="updatePolicy">确 定</el-button>
                    </div>
                </el-dialog>

                <el-dialog v-model="addDialogVisiblePolicy" title="新增策略">
                    <el-form :model="policyForm" ref="policyForm" :rules="policyRules">
                        <el-form-item label="角色" prop="role">
                            <el-input type="text" v-model="policyForm.role"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称" prop="deviceName">
                            <el-input type="text" v-model="policyForm.deviceName"></el-input>
                        </el-form-item>
                        <el-form-item label="操作" prop="operation">
                            <el-input type="text" v-model="policyForm.operation"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisiblePolicy = false">取 消</el-button>
                        <el-button type="primary" @click="addPolicy">确 定</el-button>
                    </div>
                </el-dialog>

            </el-tab-pane>



        </el-tabs>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import deviceApi from '@/api/device.js'
import policyApi from '@/api/policy.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'



export default {
    data() {
        return {
            deviceData: [],
            addDialogVisible: false,
            updateDialogVisible: false,
            deviceForm: {
                name: '',
                state: '',
                power: '',
            },
            deviceRules: {
                name: [
                    { required: true, message: '请输入设备名', trigger: 'blur' },
                ],
                state: [
                    { required: true, message: '请输入设备状态', trigger: 'blur' },
                ],
                power: [
                    { required: true, message: '请输入设备电量', trigger: 'blur' },
                ],
            },
            policyData: [],
            addDialogVisiblePolicy: false,
            updateDialogVisiblePolicy: false,
            policyForm: {
                role: '',
                deviceName: '',
                operation: '',
            },

            policyRules: {
                role: [
                    { required: true, message: '请输入角色', trigger: 'blur' },
                ],
                deviceName: [
                    { required: true, message: '请输入设备名', trigger: 'blur' },
                ],
                operation: [
                    { required: true, message: '请输入操作类型', trigger: 'blur' },
                ],
            },
        };
    },

    created() {
        this.getDeviceData();
        this.getPolicyData();
    },

    methods: {
        async getDeviceData() {
            const res = await deviceApi.getDeviceListApi();
            console.log("deviceData ", res);
            this.deviceData = res;
        },
        async handleAddDevice() {
            this.addDialogVisible = true;
        },
        async addDevice() {
            this.$refs.deviceForm.validate(async (valid) => {
                if (valid) {
                    const res = await deviceApi.addDeviceApi(this.deviceForm);
                    ElMessage.success(res.msg);
                    this.addDialogVisible = false;
                    this.getDeviceData();
                } else {
                    return false;
                }
            });
        },
        async handleUpdateDevice() {
            this.updateDialogVisible = true;
        },
        async updateDevice(row) {
            this.$refs.deviceForm.validate(async (valid) => {
                if (valid) {
                    const res = await deviceApi.updateDeviceApi(this.deviceForm);
                    ElMessage.success(res.msg);
                    this.updateDialogVisible = false;
                    this.getDeviceData();
                } else {
                    return false;
                }
            });
        },

        async deleteDevice(row) {
            console.log("deleteDevice ", row.name);
            deviceApi.deleteDeviceApi({ name: row.name });
            this.getDeviceData();
        },


        async getPolicyData() {
            const res = await policyApi.getPolicyListApi();
            console.log("policyData ", res);
            this.policyData = res;
        },

        async handleAddPolicy() {
            this.addDialogVisiblePolicy = true;
        },

        async addPolicy() {
            this.$refs.policyForm.validate(async (valid) => {
                if (valid) {
                    const res = await policyApi.addPolicyApi(this.policyForm);
                    ElMessage.success(res.msg);
                    this.addDialogVisiblePolicy = false;
                    this.getPolicyData();
                } else {
                    return false;
                }
            });
        },

        async handleUpdatePolicy() {
            this.updateDialogVisiblePolicy = true;
        },

        async updatePolicy(row) {
            this.$refs.policyForm.validate(async (valid) => {
                if (valid) {
                    console.log("updatePolicy ", this.policyForm);
                    const res = await policyApi.updatePolicyApi(this.policyForm);
                    ElMessage.success(res.msg);
                    this.updateDialogVisiblePolicy = false;
                    this.getPolicyData();
                } else {
                    return false;
                }
            });
        },

        async deletePolicy(row) {
            const res = await policyApi.deletePolicyApi({ role: row.role, deviceName: row.deviceName, operation: row.operation });
            this.getPolicyData();
        },



    },

};

</script>

