import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItemButton,
  Chip,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from '@mui/material';
import {
  Settings,
  Print,
  Search,
  Add,
  Delete,
  CheckBox,
} from '@mui/icons-material';

interface Patient {
  id: number;
  name: string;
  age: string;
  patientCode: string;
  visitCode: string;
  status: 'waiting' | 'examining' | 'done';
}

interface Prescription {
  stt: number;
  tenThuoc: string;
  dvt: string;
  lieuDung: string;
  slDung: number;
  dvsd: string;
  phuongPhap: string;
  soLuong: string;
  tGian: number;
  sang: number;
  trua: number;
  chieu: number;
  toi: number;
}

const patientsData: Patient[] = [
  { id: 1, name: 'NGUYỄN VĂN MINH KHÔ', age: '47 tuổi', patientCode: 'HS001', visitCode: '0601/15436', status: 'examining' },
  { id: 2, name: 'TRẦN THỊ BÍCH', age: '32 tuổi', patientCode: 'HS002', visitCode: '0601/15678', status: 'waiting' },
  { id: 3, name: 'LÊ HOÀNG CƯỜNG', age: '18 tuổi', patientCode: 'HS003', visitCode: '0621/43782', status: 'waiting' },
  { id: 4, name: 'PHẠM THỊ DUNG', age: '25 tuổi', patientCode: 'HS004', visitCode: '0621/67890', status: 'waiting' },
  { id: 5, name: 'HOÀNG VĂN ÊM', age: '51 tuổi', patientCode: 'HS005', visitCode: '0624/78901', status: 'waiting' },
  { id: 6, name: 'VÕ THỊ PHƯƠNG', age: '38 tuổi', patientCode: 'HS006', visitCode: '0718/89012', status: 'waiting' },
  { id: 7, name: 'ĐẶNG QUỐC GIANG', age: '32 tuổi', patientCode: 'HS007', visitCode: '0968/78903', status: 'waiting' },
  { id: 8, name: 'BÙI THỊ HẢI', age: '28 tuổi', patientCode: 'HS008', visitCode: '0978/01234', status: 'waiting' },
  { id: 9, name: 'MÃ VĂN ÍCH', age: '47 tuổi', patientCode: 'HS009', visitCode: '0488/12345', status: 'waiting' },
  { id: 10, name: 'NGỌC THỊ KIM', age: '35 tuổi', patientCode: 'HS010', visitCode: '0960/12456', status: 'waiting' },
  { id: 11, name: 'ĐỖ VĂN LONG', age: '61 tuổi', patientCode: 'HS011', visitCode: '0601/43269', status: 'waiting' },
];

const prescriptionData: Prescription[] = [
  { stt: 1, tenThuoc: 'SCOLANZO 20mg', dvt: 'VIÊN', lieuDung: '1', slDung: 1, dvsd: 'VIÊN', phuongPhap: 'Uống', soLuong: 'Trước ăn', tGian: 28, sang: 1, trua: 0, chieu: 0, toi: 0 },
  { stt: 2, tenThuoc: 'SCOLANZO 20mg', dvt: 'VIÊN', lieuDung: '1', slDung: 1, dvsd: 'VIÊN', phuongPhap: 'Uống', soLuong: 'Trước ăn', tGian: 28, sang: 0, trua: 1, chieu: 0, toi: 0 },
  { stt: 3, tenThuoc: 'SCOLANZO 20mg', dvt: 'VIÊN', lieuDung: '1', slDung: 1, dvsd: 'VIÊN', phuongPhap: 'Uống', soLuong: 'Trước ăn', tGian: 28, sang: 0, trua: 0, chieu: 1, toi: 0 },
  { stt: 4, tenThuoc: 'ELINON 50MG', dvt: 'VIÊN', lieuDung: '1', slDung: 1, dvsd: 'VIÊN', phuongPhap: 'Uống', soLuong: 'Trước ăn', tGian: 28, sang: 0, trua: 0, chieu: 0, toi: 1 },
  { stt: 5, tenThuoc: 'SCOLANZO 20mg', dvt: 'VIÊN', lieuDung: '1', slDung: 1, dvsd: 'VIÊN', phuongPhap: 'Uống', soLuong: 'Trước ăn', tGian: 28, sang: 1, trua: 1, chieu: 0, toi: 0 },
  { stt: 6, tenThuoc: 'SCOLANZO 20mg', dvt: 'VIÊN', lieuDung: '1', slDung: 1, dvsd: 'VIÊN', phuongPhap: 'Uống', soLuong: 'Sau ăn', tGian: 28, sang: 0, trua: 1, chieu: 1, toi: 0 },
];

export function VietnameseMedicalSystem() {
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patientsData.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#ECF0F5' }}>
      {/* Left Sidebar - Patient Queue */}
      <Box
        sx={{
          width: 280,
          bgcolor: 'white',
          borderRight: '1px solid #ddd',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Phòng Khám:</Typography>
            <Typography>Phòng Khám Gần ABC</Typography>
            <IconButton size="small">
              <Settings fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#666' }}>Bác sĩ:</Typography>
            <Typography variant="body2">NGUYỄN VĂN A</Typography>
          </Box>
          <TextField
            size="small"
            placeholder="dd/MM/yyyy"
            defaultValue="01/05/2026"
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" fullWidth>Sáng</Button>
          </Box>
        </Box>

        {/* Patient List Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #ddd', bgcolor: '#f8f9fa' }}>
          <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
            Danh sách bệnh nhân
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Tìm theo số hồ sơ/tên bệnh nhân
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm"
            sx={{ mt: 1, bgcolor: 'white' }}
          />
        </Box>

        {/* Patient List */}
        <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
          {filteredPatients.map((patient, index) => (
            <ListItemButton
              key={patient.id}
              selected={selectedPatient.id === patient.id}
              onClick={() => setSelectedPatient(patient)}
              sx={{
                borderBottom: '1px solid #f0f0f0',
                py: 1.5,
                px: 2,
                flexDirection: 'column',
                alignItems: 'flex-start',
                bgcolor: selectedPatient.id === patient.id ? '#E8F4FD' : 'white',
                '&:hover': {
                  bgcolor: selectedPatient.id === patient.id ? '#E8F4FD' : '#f8f9fa',
                },
              }}
            >
              <Box sx={{ display: 'flex', width: '100%', mb: 0.5 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '13px',
                    color: patient.status === 'examining' ? '#FF6B00' : '#333',
                  }}
                >
                  #{index + 1} {patient.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {patient.age}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {patient.patientCode}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {patient.visitCode}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>

        {/* Footer Buttons */}
        <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#00A0E3',
              '&:hover': { bgcolor: '#0090D0' },
              textTransform: 'none',
            }}
          >
            BẮT ĐẦU KHÁM
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#E74C3C',
              '&:hover': { bgcolor: '#C0392B' },
              textTransform: 'none',
            }}
          >
            CHUYỂN VIỆN
          </Button>
        </Box>
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Tổng: <span style={{ color: '#00A0E3', fontWeight: 600 }}>48</span>{' '}
            ĐKC: <span style={{ color: '#E74C3C', fontWeight: 600 }}>10</span>{' '}
            CK: <span style={{ color: '#95A5A6', fontWeight: 600 }}>38</span>
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Patient Info Header */}
        <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #ddd', p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Thông tin bệnh nhân
          </Typography>
          <Grid container spacing={2} sx={{ fontSize: '13px' }}>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>Số hồ sơ:</Typography>
              <Typography sx={{ fontWeight: 600 }}>HS12456</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>Họ tên:</Typography>
              <Typography sx={{ fontWeight: 600 }}>NGUYỄN VĂN A</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>CCCD:</Typography>
              <Typography>123456789</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>SĐT:</Typography>
              <Typography>0123456789</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>Tuổi:</Typography>
              <Typography>45</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>DOB:</Typography>
              <Typography>01/01/1979</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ fontSize: '13px', mt: 0.5 }}>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>Bệnh hồng:</Typography>
              <Typography>Bệnh thận</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>Email:</Typography>
              <Typography>john@example.com</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>BHYT:</Typography>
              <Typography>PT0424210</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>HN:</Typography>
              <Typography>HN001</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" sx={{ color: '#666' }}>Giới tính:</Typography>
              <Typography>Nam</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  bgcolor: '#27AE60',
                  '&:hover': { bgcolor: '#229954' },
                  textTransform: 'none',
                }}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs */}
        <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #ddd' }}>
          <Tabs
            value={currentTab}
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                minHeight: 48,
                fontWeight: 500,
                fontSize: '13px',
              },
              '& .Mui-selected': {
                color: '#00A0E3',
              },
            }}
          >
            <Tab label="Bệnh án" />
            <Tab label="Toa" />
            <Tab label="Xem bệnh án" />
            <Tab label="Cận lâm sàng" />
            <Tab label="Nhập kết quả CLS" />
            <Tab label="Tóm tắt bệnh án" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {currentTab === 0 && (
            <Box>
              {/* Medical Record Content */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={{ mb: 2 }}>
                    <Box sx={{ p: 2, bgcolor: '#00A0E3', color: 'white' }}>
                      <Typography sx={{ fontWeight: 600 }}>Chẩn đoán</Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                        <InputLabel>Phân loại</InputLabel>
                        <Select label="Phân loại">
                          <MenuItem value="1">Loại 1</MenuItem>
                          <MenuItem value="2">Loại 2</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                        <InputLabel>Loại DV</InputLabel>
                        <Select label="Loại DV">
                          <MenuItem value="1">Chọn</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Nhập tên dịch vụ để tìm..."
                      />
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <Box sx={{ p: 2, bgcolor: '#00A0E3', color: 'white' }}>
                      <Typography sx={{ fontWeight: 600 }}>Cận lâm sàng</Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Tìm kiếm dịch vụ (Tên,Mã)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Nhập tên dịch vụ để tìm..."
                      />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {currentTab === 1 && (
            <Box>
              {/* Prescription Table */}
              <Card>
                <Box sx={{ p: 2, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Chuẩn đoán - điều trị
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip label="CD dựa theo Y học chứng cứ" size="small" color="primary" />
                    <Chip label="Cơ" size="small" />
                    <Chip label="Không" size="small" />
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="CD chính"
                    defaultValue="K29"
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip
                      label="CD phụ"
                      size="small"
                      sx={{ bgcolor: '#10B981', color: 'white' }}
                    />
                    <Typography variant="body2">Lời dặn</Typography>
                  </Box>

                  {/* Prescription Table */}
                  <TableContainer sx={{ border: '1px solid #ddd', mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#00A0E3' }}>
                          <TableCell sx={{ color: 'white', fontWeight: 600, py: 1 }}>STT</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Tên thuốc</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>ĐVT</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Liều dùng</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>SL dùng</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>ĐVSD</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>PP_Liệu pháp</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Số lượng</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>T.Gian SD</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Sáng</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Trưa</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Chiều</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Tối</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>Không BHYT</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {prescriptionData.map((row) => (
                          <TableRow key={row.stt} sx={{ '&:hover': { bgcolor: '#f8f9fa' } }}>
                            <TableCell>{row.stt}</TableCell>
                            <TableCell>{row.tenThuoc}</TableCell>
                            <TableCell>{row.dvt}</TableCell>
                            <TableCell>{row.lieuDung}</TableCell>
                            <TableCell>{row.slDung}</TableCell>
                            <TableCell>{row.dvsd}</TableCell>
                            <TableCell>{row.phuongPhap}</TableCell>
                            <TableCell>{row.soLuong}</TableCell>
                            <TableCell>{row.tGian}</TableCell>
                            <TableCell>{row.sang || '-'}</TableCell>
                            <TableCell>{row.trua || '-'}</TableCell>
                            <TableCell>{row.chieu || '-'}</TableCell>
                            <TableCell>{row.toi || '-'}</TableCell>
                            <TableCell>
                              <Checkbox size="small" />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" sx={{ color: '#E74C3C' }}>
                                <Delete fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ bgcolor: '#27AE60', '&:hover': { bgcolor: '#229954' } }}
                    >
                      Thêm
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ bgcolor: '#E74C3C', '&:hover': { bgcolor: '#C0392B' } }}
                    >
                      Xóa đã chọn
                    </Button>
                  </Box>

                  {/* Bottom Form */}
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Lần tái khám"
                        placeholder="Ngày hẹn"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Ngày hẹn"
                        placeholder="mm/dd/yyyy"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Buổi</InputLabel>
                        <Select label="Buổi">
                          <MenuItem value="sang">Sáng</MenuItem>
                          <MenuItem value="chieu">Chiều</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: '#00A0E3',
                          '&:hover': { bgcolor: '#0090D0' },
                          textTransform: 'none',
                        }}
                      >
                        Lưu
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField fullWidth size="small" label="Phòng khám" />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Nơi đến</InputLabel>
                        <Select label="Nơi đến">
                          <MenuItem value="1">Chọn</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: '#3498DB',
                          '&:hover': { bgcolor: '#2980B9' },
                          textTransform: 'none',
                        }}
                      >
                        In
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Box>
          )}

          {currentTab === 2 && (
            <Box>
              <Typography>Xem bệnh án content</Typography>
            </Box>
          )}

          {currentTab === 3 && (
            <Box>
              <Typography>Cận lâm sàng content</Typography>
            </Box>
          )}

          {currentTab === 4 && (
            <Box>
              <Typography>Nhập kết quả CLS content</Typography>
            </Box>
          )}

          {currentTab === 5 && (
            <Box>
              <Typography>Tóm tắt bệnh án content</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
